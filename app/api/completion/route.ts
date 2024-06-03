import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse, experimental_StreamData } from 'ai';
interface ChatCompletionRequestMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  name?: string;
}

interface Chunk {
  id: string;
  content: string;
  metadata_json?: object | null; // Use `Record<string, any>` if the object structure is known
  knowledgebase_id?: string | null;
  model_dim?: number | null;
  file_id?: string | null;
  file_name?: string | null;
  user_id?: string | null;
  getStamp?: number
  sourceNum: number,
}

const PRUNE_IT_DOWN_CONTEXT_LIMIT: number = Number(process.env.PRUNE_IT_DOWN_CONTEXT_LIMIT!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const amendSystemMessage = (messages: any[]): any[] => {
  const formattedMessages = messages.filter((message: any) => message.role !== 'system')
  const systemPrompt = `All your output is parsed in Markdown and Mathjax. for any equations and maths blocks be sure to wrap it in $$...$$.
Example START:
Lift($$L$$) can be determined by Lift Coefficient ($$C_L$$) like the following
equation.
$$
L = \frac{1}{2} \rho v^2 S C_L
$$
Example END
be sure to wrap inline maths with ($$...$$)
`
  formattedMessages.push({ role: 'system', content: systemPrompt })
  return formattedMessages
}

const formatChunk = (chunk: Chunk) => {
  let formattedChunk = ""
  formattedChunk += `Source Number: ${chunk.sourceNum}\n`
  formattedChunk += `Content: ${chunk.content}\n\n`
  return formattedChunk
}

const formatUserMessage = (inputUserMessage: string, chunks: Chunk[]): string => {
  let user_message = ""
  user_message += `The user is currently interacting with you via a chat interface on a WebApp. The user is going to provide you some resources, and is going to ask you questions, and the user expects you to answer based on the content in the provided resources.\n`
  user_message += `Answer the reader as if you were a helpful assistant, and your goal is to give the user a good overview of the content discussed in the provided resources.`
  user_message += `Be concise. Brevity is rewarded. Verbosity is penalised.`
  user_message += `The following are the sources that the user has provided to you:\n\n`

  for (const chunk of chunks) {
    user_message += formatChunk(chunk)
  }

  user_message += `If you use any of the above content, BE SURE TO CITE THE SOURCE.\n`
  user_message += `If you cite a source, cite it by citing the NUMBER of the source, i.e. for Source number: 1 format the citation as Markdown like so [Source_1](source_1).`
  user_message += `If you do NOT rely on the above content, do NOT cite a source. Do NOT make up citations.`
  user_message += `Be sure to spread your citations throughout your response where relevant, and only rely on content that is relevant in response to the user message.`
  user_message += `Make sure to cite the most relevant source first.\n\n`
  user_message += `The user's last messages was: ${inputUserMessage}\n.`

  user_message += "Your output will be parsed as markdown. Write in small paragraphs. Double space the paragraphs.\n"
  user_message += "Use links to cite the videos with this exact citation notation: [Source_n](source_n). i.e. for example, if you cite source number 1, then you would write [Source_1](source_1), and if you sourced source number 2, then you would write [Source_2](source_2).\n"
  user_message += "If you cite a source, be sure to include two line breaks after the citation, in markdown format, by adding two spaces and two linebreaks after the full stop, like so. \n\n"
  return user_message
}

export async function POST(req: Request) {
  const { messages, data } = await req.json();

  const userMessage = messages.slice(-1)[0]

  const messageContent = formatUserMessage(userMessage.content, data)

  const userMessageFormatted = { role: 'user', content: messageContent }

  messages[messages.length - 1] = userMessageFormatted

  const formattedMessages = amendSystemMessage(messages)
  async function reducePromptIfNecessary(messages: any) {
    let reducedMessages = []
    for (let i = messages.length - 1; i >= 0; i--) {
      // iterate through the messages backwards and prune them until the total length is less than 4096
      if (reducedMessages.join(' ').length < PRUNE_IT_DOWN_CONTEXT_LIMIT) {
        reducedMessages.push(messages[i])
      }
    }
    return reducedMessages.reverse()
  }
  
  const reducedFormattedMessages: any[] = await reducePromptIfNecessary(formattedMessages)
  
  // only keep the 'content' and 'role' field in the messages  
  const openaiMessages: ChatCompletionRequestMessage[] = reducedFormattedMessages.map((message: any) => {
    return {
      content: message.content,
      role: message.role
    }
  });

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages: openaiMessages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);


  // Respond with the stream
  return new StreamingTextResponse(stream, {});
}
