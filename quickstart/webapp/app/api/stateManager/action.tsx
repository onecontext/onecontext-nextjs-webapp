'use server';
import {createAI, getMutableAIState, render, useUIState} from 'ai/rsc';
import React from "react";
import {contextGet} from "@/api/context/action";
import {Message} from "ai/react";

// it will only add this many characters of context to each request
const AUGMENTED_CONTEXT_LIMIT = 6_000

// doesn't work if exporting server side functions from here
// works only for request handlers
// Set the runtime to edge for best performance
// export const runtime = 'edge';

export async function contextChat(uiMessages: Message[]) {
  'use server';

  const aiState: any = getMutableAIState<typeof AI>();
  
  // get the last message from the user here
  const userInput = uiMessages[uiMessages.length - 1].content

  // update with the latest user message
  aiState.update({
    chat: uiMessages,
    context: aiState.get()['context']
  })
  
  const contextLimit = AUGMENTED_CONTEXT_LIMIT


  const augmentAIStateWithContext = async (contextQuery: string) => {
    if (contextQuery.length !== 0) {
      // if no chat history to use in order to make a context request,
      // then just continue
      // if however you do have chat history, then use it to make a context request,
      //   and then augment the ai state (chat history) with the context messages
      const contextResponse = await contextGet(contextQuery)
      if (contextResponse) {
        const contextChunks = []
        let contextString = ""
        const getStamp = Date.now()
        for (const key in contextResponse['chunks']) {
          if (contextString.length < contextLimit) {
            let ctx: string = `${contextResponse['chunks'][key]['content']}`
            // add a timestamp for when you GOT each bit of context. this way you can
            // sort by this timestamp in the sidebar in the front end.
            //   this way the user sees the most recent context sources continuously
            // rerank on each interaction with the chat. this has a nice visual effect
            contextResponse['chunks'][key]['getStamp'] = getStamp
            contextResponse['chunks'][key]['sourceNum'] = Number(key)+1
            contextChunks.push(contextResponse['chunks'][key])
            contextString += ctx
          } else {
            break
          }
        }
        // not anymore
        // push back to frontend so it can update with the latest content sources
        // in the sidebar even before starting to generate below
        aiState.update({
          chat:
            [
              ...aiState.get()['chat'],
            ],
          context: contextChunks});
      } else {
        aiState.update({
          chat:
            [
              ...aiState.get()['chat'],
            ],
          context: []});
      }
    }
  }
  
  // could also use retriever text sliced here
  await augmentAIStateWithContext(userInput)
  
  const dateNow: number = Date.now()
  
  await aiState.done()

  return {
    id: dateNow,
    context: aiState.get()['context']
  };
}

const initialAIState: {
  chat: {
    role: string;
    content: string;
    id?: string;
    name?: string;
  }[],
  context: any[]
} = {chat: [], context: []};

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  role: string;
  display: React.ReactNode
}[] = [];


// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
  actions: {
    contextChat
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
});
