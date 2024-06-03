'use client'
import type { AI } from '@/api/stateManager/action';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect, useRef } from 'react';
import { useActions, useAIState } from "ai/rsc";
import {Message} from "ai/react";
import { useChat } from 'ai/react';
import Image from 'next/image';
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'
import Spinner from "@/components/Spinner";
import {SourcesSidebar} from "@/components/SourcesSidebar";

export default function Index() {

    const { messages,  reload, setMessages } = useChat({ "api": "/api/completion"});
    const [activeSource, setActiveSource] = useState<undefined|number>(undefined)
    const [chatLoading, setChatLoading] = useState(false)
    const [lastMessageDispatchTime, setLastMessageDispatchTime] = useState<number>(0)
    const [lastContextBackTime, setLastContextBackTime] = useState<number>(0)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const sourcesRef = useRef<HTMLDivElement>(null)
    const {contextChat} = useActions<typeof AI>();
    const [aiState, setAiState] = useAIState()
    const [ocInput, setOcInput] = useState('')

    const scrollToBottom = () => {
        // Directly scroll the container that has the ref
        const scrollContainer: any = messagesEndRef.current;
        if (scrollContainer) {
            const isOverflowing = scrollContainer.scrollHeight > scrollContainer.clientHeight;
            const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 50; // 50 is a threshold

            // Only scroll to bottom if overflowing and not already at the bottom
            if (isOverflowing && !isAtBottom) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);


    // the watch url is not the embed url for iframes...

    const handleOcInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOcInput(event.target.value)
    }

    const augmentedSubmit = async (event: any) => {
        event.preventDefault();
        setChatLoading(true)
        const dispatchTime = Date.now()
        setLastMessageDispatchTime(dispatchTime)
        const id = String(dispatchTime)
        const latestMessage: Message = {role: 'user', content: ocInput, id: id}
        const uiMessages = [...messages, latestMessage]
        // set the messages so that vercel AI knows about them
        setMessages(uiMessages)
        setOcInput('')
        // WAIT to generate the new AI state before continuing
        contextChat(uiMessages).then(async (res: {id: number, context: any[]}): Promise<void> => {
            // now you have the new AI state, RELOAD.
            // i.e.
            /**
             * Reload the last AI chat response for the given chat history. If the last
             * message isn't from the assistant, it will request the API to generate a
             * new response.
             */
            setChatLoading(false)
            setLastContextBackTime(res.id)
            await reload({options: { body: {messages: [...messages, {role: "user", content: ocInput, id: id}], data: res.context}}})
        })
        // Note, here you are leveraging vercel AI's state update to get the new context 
        // You are NOT just sending ALL the chunks back from contextChat (which is a server side function, but basically just a request)
        // The subtle difference is that a request will blindly send ALL the new chunks over the wire each time.
        // However, vercel AI's state update will leverage jsondiffpatch to only send the new chunks over the wire.
    }

    const selectSource = (index: number | null): void => {
        if (index !== null) {
            setActiveSource(index - 1)
            if (sourcesRef.current) {
                sourcesRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        }
    }

    const extractNumber = (text: string): number | null => {
        const match = text.match(/source_(\d+)/);
        return match ? parseInt(match[1], 10) : null;
    };

    return (
      <>

          <div className="flex overflow-y-auto" style={{height: "100vh"}}>
              {/* Main chat area */}
              {messages.length > 0 ?
                <>
                    <div className="flex flex-col flex-1">

                        <div ref={messagesEndRef}
                             className="flex flex-col pb-4 pt-2 px-48 xs:px-4 sm:px-4 md:px-24 lg:px-24 xl:px-64">
                            {/*just give me the last user message*/}
                            {messages.length > 0 ? <h1
                              className={"justify-items text-neutral-900 items-center text-3xl font-tilt flex flex-row py-4"}> {messages?.filter((m) => m.role === `user`).map(m => m.content).at(-1)} </h1> : null}

                            <div className={"flex flex-row"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="text-dblue-700 w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>
                                </svg>

                                <h1 className="text-2xl font-tilt text-dblue-700 items-start m-2">Answer</h1>
                            </div>

                            {/*if the chat is loading show a spinner.*/}
                            {/*if not, then, filter the chat to only show (a) the messages from the assistant, (b) the latest message, and (c), only show that latest message if the number of the*/}
                            {/*id is greater than the dispatch time. this last step is to prevent the last message flashing up just before the streaming starts*/}
                            {chatLoading ? <Spinner
                              loading/> : <> {messages.filter((m) => m.role === 'assistant' && Number(m.createdAt) > lastMessageDispatchTime).slice(-1).map(m => (
                              <>
                                  <div key={m.id}
                                       className={` text-justify text-lg font-nunito text-md text-neutral-900 p-4 rounded-xl my-2 mx-4 ${m.role === 'user' ? 'bg-transparent' : 'bg-transparent'}`}>
                                      <div className="flex items-center">
                                          <div><Markdown
                                            components={{
                                                a: ({node, ...props}) => {
                                                    const s: number | null = extractNumber(String(props.href))
                                                    return <b style={{color: 'cyan'}}><i>
                                                        <button
                                                          onClick={() => selectSource(s)}>{`(${s})`}</button>
                                                    </i></b>;
                                                },

                                                br: ({node, ...props}) => {
                                                    return <span><br/><br/></span>;
                                                }
                                            }}
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}>{m.content}</Markdown></div>
                                      </div>

                                  </div>
                              </>
                            ))}</>}


                            <div>
                                <div className={'flex flex-row mt-2'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="text-neutral-800 w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"/>
                                    </svg>
                                    <h1 className="text-2xl text-neutral-800 font-tilt items-start m-2">Sources</h1>
                                </div>
                                <div ref={sourcesRef} className={"flex flex-col items-center"}>
                                    {aiState?.context.length > 0 && (lastContextBackTime > lastMessageDispatchTime) ?
                                      <SourcesSidebar contextSource={aiState?.context} activeVideo={activeSource}
                                                      setActiveVideo={setActiveSource}/> :
                                      <Spinner loading color={"#FDFBF8"}/>}
                                </div>
                            </div>

                            {/*Extras*/}
                            <div className={"py-16"}>
                                {/*to provide space at the bottom, in between the sources and the form input*/}
                            </div>
                        </div>
                    </div>

                </> : <h1
                  className={"text-2xl text-neutral-900 flex flex-1 justify-items items-center mx-auto mt-[20vh] flex-col font-mono"}>{`Ask something to get started.`}</h1>}
              {/* Fixed input bar above footer */}
              <div className={"overflow-y-auto"} style={{height: "25vh"}}>
                  <div className="z-50 fixed bg-transparent inset-x-0 bottom-0 px-4 py-3">
                      <div className="mx-auto max-w-3xl focus:outline-none focus:ring focus:border-pink-100">
                          <div
                            className="bg-neutral-100 rounded-3xl border-2 border-dblue-300 focus:outline-none focus:border-2 focus:border-dpink-400">
                              <form onSubmit={async (e: any): Promise<void> => augmentedSubmit(e)}
                                    className="flex items-center">
                                  <input
                                    className="flex-1 m-2 rounded-3xl bg-neutral-100 focus:outline-none text-neutral-900 text-sm p-2"
                                    value={ocInput}
                                    placeholder={messages.filter(m => m.role === 'user').length > 0 ? `Ask a follow up question` : `What would you like to know?`}
                                    onChange={handleOcInputChange}
                                  />
                                  <button
                                    type="submit"
                                    className="mr-2 pr-2 bg-dblue-400 p-2 rounded-full shadow"
                                  >
                                  <PaperAirplaneIcon
                                        className="h-6 w-6 text-neutral-900 transform transition-transform duration-500 hover:-rotate-90"/>
                                  </button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
}
