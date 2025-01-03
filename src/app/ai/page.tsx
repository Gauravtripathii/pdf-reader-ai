"use client";

import AttachFileIcon from '@mui/icons-material/AttachFile';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import React, { useState, useEffect } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Header from '../components/Header';

interface ConversationType {
    question: string;
    answer: string;
};

export default function AI() {
    const [readFile, setReadFile] = useState<boolean>(false);
    const [currentContext, setCurrentContext] = useState<string | null>(null);
    const [currentQuery, setCurrentQuery] = useState<string | null>(null);
    const [conversations, setConversations] = useState<ConversationType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        pdfToText(file)
            .then((text: any) => {
                setCurrentContext(text);
                setIsLoading(true);
                toast.success("File Uploaded, Ask your query now!");
            })
            .catch((error: any) => {
                toast.error("Error uploading file, please try again!");
                console.log(error);
            })
            .finally(() => {
                setReadFile(false);
                setIsLoading(false);
            });
    };

    const askGroq = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        if (!currentContext || !currentQuery) {
            setIsLoading(false);
            toast.error("Please upload a file and ask a query!");
            return;
        }
        await axios.post('/api/ask', { currentContext, currentQuery })
            .then((response: any) => {
                if (currentQuery) {
                    setConversations(prevConversations => [
                        ...(prevConversations || []),
                        { question: currentQuery, answer: response.data.answer }
                    ]);
                }
            })
            .catch((error: any) => {
                toast.error("Error asking query, please try again!");
                console.log(error);
            })
            .finally(() => {
                setCurrentQuery(null);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        console.log(conversations);
    }, [conversations]);

    return (
        <div className="w-full h-[100svh] flex flex-col relative">
            <Header />

            <main className="w-full h-[90%] relative">
                {/* ANSWER CONTAINER */}
                <div className="w-full h-[93%] px-10 pt-5 flex flex-col gap-5 overflow-auto">

                    {conversations?.map((conversation, index) => (
                        <div key={index} className="text-[20px] flex flex-col gap-3 border-b pb-5">
                            <p className='flex items-center gap-2'>
                                <span className='w-12 h-12 rounded-full overflow-hidden'>
                                    <Image src="/user.gif" alt='bot' width={1900} height={1900} className='w-full h-full' />
                                </span>
                                <span className='w-[90%] text-justify'>{conversation.question}</span>
                            </p>
                            <p className='flex gap-2'>
                                <span className='w-12 h-12 rounded-full overflow-hidden'>
                                    <Image src="/bot.gif" alt='user' width={1900} height={1900} className='w-full h-full' />
                                </span>
                                <span className='w-[90%] text-justify'>{conversation.answer}</span>
                            </p>
                        </div>
                    ))}

                </div>

                {/* QUESTIONS CONTAINER */}
                <div className="w-full h-[7%] border-t border-slate-500 flex items-center px-10 py-2">
                    <p className='pr-2 cursor-pointer' onClick={() => setReadFile(!readFile)}>
                        <AttachFileIcon />
                    </p>
                    <p className='w-full h-full'>
                        <input
                            type="text"
                            placeholder='Type your query here...'
                            value={currentQuery ? currentQuery : ''}
                            onChange={event => setCurrentQuery(event.target.value)}
                            className='w-full h-full rounded-full px-5 text-black' />
                    </p>
                    <p className='pl-2 cursor-pointer' onClick={event => askGroq(event)}>
                        <AutoAwesomeIcon />
                    </p>
                </div>

                {/* FILE READER */}
                {readFile && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white h-72 flex items-center justify-center p-5 rounded-lg">
                        <input type="file" onChange={handleFileUpload} />
                    </div>
                )}
            </main>

            {/* LOADING SCREEN */}
            {isLoading && (
                <div className="absolute top-0 left-0 w-full h-[100svh] flex flex-col items-center justify-center bg-[rgba(0,0,0,0.75)] text-[30px] font-bold font-mono">
                    Thinking...
                    {/* <Image src="/loading.gif" alt='bot' width={1900} height={1900} className='w-12 h-12 rounded-full' /> */}
                </div>
            )}
        </div>
    );
}
