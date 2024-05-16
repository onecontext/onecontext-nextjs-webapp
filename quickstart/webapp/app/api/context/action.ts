"use server"
import * as OneContext from '@onecontext/ts_sdk';

export async function contextGet(input: string): Promise<any> {
  "use server"
  // get the request body
  // remove any new line characters from the input (otherwise you get nesting yaml badness)
  
  // these need to be here because each of these functions gets 'run on the edge' as a serverless function
  const inputCleaner = async (input: string): Promise<string> => input.replace(/(\r\n|\n|\r)/gm, "")
  const inputCleaned: string = await inputCleaner(input)

  const runArgs: OneContext.RunArgsType = {
    pipelineName: 'retrieve_fast',
    // overrideArgs: {"retriever" : {"query": `${inputCleaned}`, "top_k": 50}, "reranker": {"query": `${inputCleaned}`, "top_k": 5}},
    overrideArgs: {"retriever" : {"query": `${inputCleaned}`, "top_k": 50}},
    BASE_URL: process.env.BASE_URL!,
    API_KEY: process.env.API_KEY!
  }
  return await OneContext.runPipeline(runArgs).then((res) => {
    return res
  })
}

