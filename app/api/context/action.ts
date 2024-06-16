"use server"
import * as OneContext from '@onecontext/ts-sdk';

export async function contextGet(input: string): Promise<any> {
  "use server"
  // get the request body
  // remove any new line characters from the input (otherwise you get nesting badness)
  const inputCleaner = async (input: string): Promise<string> => input.replace(/(\r\n|\n|\r)/gm, "")
  const inputCleaned: string = await inputCleaner(input)

  const runArgs: OneContext.RunType = {
    pipelineName: 'demo_query',
    overrideArgs: {"query_embedder" : {"query": `${inputCleaned}`, "top_k": 10},},
    BASE_URL: process.env.BASE_URL!,
    API_KEY: process.env.API_KEY!
  }
  return await OneContext.runPipeline(runArgs).then((res) => {
    console.log(`the res is ${res}`)
    return res
  })
}

