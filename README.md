# Template OneContext / NextJS / Vercel AI WebApp

## What is this?

A WebApp, built with the NextJS framework, that leverages both [Vercel AI](https://github.com/vercel/ai) and [
OneContext](https://docs.onecontext.ai) to augment the entire application (both server and client side) with an `AI
Provider` which has both:
- (a) the most recent history of all the interactions between your user and your model.
- (b) the most relevant context for the particular user and the particular interaction with the model (with the context coming from OneContext)

## What can I do with it?

You can create up a WebApp that looks vaguely similar to apps like [Perplexity](https://perplexity.ai)
and [You](https://you.com), with a chat interface, streaming responses, and which lets users "chat" with any corpus of
information you can host in a OneContext knowledge base.


## How to use it in your app

### What you'll need

We assume you already have the following:
- OneContext API Key
- A `query` pipeline set up (i.e. one that goes from `vector index` to `chunks`)
- Content already indexed (via an `ingestion` pipeline) from a `knowledge base` into a `vector index`.

If you do _not_ have these set up already, please do so first! You can do the above either via [Python](https://github.com/onecontext/onecontext-python), [TypeScript](https://github.com/onecontext/onecontext-typescript), or the [Command Line Tool](https://github.com/onecontext/onecontext-cli)

## How the app works

The app, in a nutshell, is 4 things.

1. A completion method
2. A context method
3. A state manager
4. A chatbot

Let's do through these components, and how you can use them:

### The Completion Method

This can be found at `app/api/completion/route.ts`. The file is an example of a [NextJS route handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).

You've _probably seen something similar_ to this before. It's basically just a POST request, which takes in some input text, passes it to a language model (in this instance, OpenAI), receives a response, and then passes it back to the client.

This is _probably a little different_ to other implementations because of two things:
1. There is some logic for pruning down the context / chat history being passed to the model on each turn.
2. This endpoint _streams_ the response from the language model back to the client.

### The Context Method

This can be found at `app/api/context/action.ts`. This file is an example of a [NextJS Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).

This file defines a function which takes a string input (in this instance, the user's last chat message), and then sends
that message to `OneContext` in order to query the specific
context relevant to the user's query. The idea here is that this context is then used to _augment_ the information that
is passed to the language model (in the Completion Method aboveCompletion Method above).

You can see below that getting the right context is as simple as just sending a string to OneContext using
the [TypeScript SDK](https://github.com/onecontext/onecontext-typescript). You don't have to do any embedding yourself,
you just fire off a string to one your pre-defined RAG pipelines, and every step of the pipeline runs automatically on a
GPU cluster at OneContext (for more on this see our [docs](https://docs.onecontext.ai).

For your application, just modify the pipelineName and overrideArgs to suit your use case.

```typescript
export async function contextGet(input: string): Promise<any> {
  "use server"
  const inputCleaner = async (input: string): Promise<string> => input.replace(/(\r\n|\n|\r)/gm, "")
  const inputCleaned: string = await inputCleaner(input)

  const runArgs: OneContext.RunType = {
    pipelineName: 'demo_query',
    overrideArgs: {"retriever" : {"query": `${inputCleaned}`, "top_k": 10}, "reranker": {"query": `${inputCleaned}`}},
    BASE_URL: process.env.BASE_URL!,
    API_KEY: process.env.API_KEY!
  }
  return await OneContext.runPipeline(runArgs).then((res) => {
    return res
  })
}
```

This example retrieves context _specific to the user's query_, however, if you want to get even more specific (such as only retrieving context relevant to that particular user), you can also do this easily just by adding more tags in the retriever step.

For example, modify the `runArgs` to read:

```typescript
const runArgs: OneContext.RunType = {
pipelineName: 'demo_query',
overrideArgs: {"retriever" : {"query": `${inputCleaned}`, "top_k": 10, "user_id": `${user_id}`}, "reranker": {"query": `${inputCleaned}`}},
BASE_URL: process.env.BASE_URL!,
API_KEY: process.env.API_KEY!
}
```

Where `user_id` here obtained **on the server side**, i.e. where this function runs, from a **trusted auth provider** like Clerk or Auth0.

### The AI Provider

This file defines the `AI Provider` object and (importantly) the `contextChat` method which lives as an `action` on the
AI state.

You can think about this file as basically defining the types of stateful objects you wish to throw around your app, and
the actions (methods) you use to update those objects. Each state can be any shape of object. In general, you should
update the objects using an action defined on the provider.

This file exports an `AI Provider` object, which comprises two `states` (the AI state, and the UI state), and one
action (`contextChat`) which is used to update the AI state on each turn with the most relevant context from OneContext.


## How do I run it?

```zsh
git clone https://github.com/onecontext/onecontext-nextjs-webapp
cd onecontext-nextjs-webapp
npm install
npm run dev
```

Now open `http://localhost:3000`.

# FAQ

## Is the Provider available on the client or the server side?

**Both**, at the _same_ time.

### Client side
You can just wrap your app with the provider like so:
```tsx
export default function Template({ children }:Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <Header/>
      <AI>
        {children}
      </AI>
    </>
)
}
```
And then, in any client side React component, accessing the AI state is as simple as dropping in this hook:

```tsx
export default function Index() {
  const [aiState, setAiState] = useAIState()
  
  const doThingsWithAIState = () => {
    // ...
  }
  return 
    // <>
      // JSX goes here
      // </>
  }
```

### Server side
For the server side, it's also very simple, just define any server side function like so:

e.g. in somewhere like `api/serverSideFunction/action.ts`

```typescript
export async function useAIStateOnTheServer() {
  'use server';
  
  const aiState: any = getMutableAIState<typeof AI>();
  const grabWhatYouNeed = () => {
    // operate on AI state here
    // return usefulObject
  }
  const giveMeThis = grabWhatYouNeed()

  return giveMeThis
}
```

## How do I find out more about how to use OneContext? 

For more info on questions like:
- What is a pipeline?
- What is a vector index?
- What is a knowledge base?
- What is a step?
- What exactly can I do with a pipeline?

Please check out our [docs](https://docs.onecontext.ai)!

Or, [just reach out via email](mailto:hello@onecontext.ai) and we'll be happy to help.

## How can I get set up with a OneContext account?

You can grab an API key [here](https://onecontext.ai/settings), and the easiest way to get started would be to follow
the `quickstart` which is available on [the docs](https://docs.onecontext.ai), and also on any of the
clients [[Python SDK](https://github.com/onecontext/onecontext-python), [TypeScript SDK](https://github.com/onecontext/onecontext-typescript), [CLI Tool](https://github.com/onecontext/onecontext-cli)]
