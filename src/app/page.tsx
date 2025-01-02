"use client";

import AttachFileIcon from '@mui/icons-material/AttachFile';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import React, { useState, useEffect } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';

interface ConversationType {
  question: string;
  answer: string;
};

export default function Home() {
  const [readFile, setReadFile] = useState<boolean>(false);
  const [currentContext, setCurrentContext] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationType[]>();

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text: any) => {
        setCurrentContext(text);
      })
      .catch((err: any) => {
        console.error(err);
      })
      .finally(() => {
        setReadFile(false);
      });
  };

  const askGroq = async (event: any) => {
    event.preventDefault();
    await axios.post('/api/ask', { currentContext, currentQuery })
      .then((response: any) => {
        console.log(response.data.answer);
        if (currentQuery) {
          setConversations(prevConversations => [
            ...(prevConversations || []),
            { question: currentQuery, answer: response.data.answer }
          ]);
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  useEffect(() => {
    console.log(conversations);
  }, [conversations]);

  return (
    <div className="w-full h-[100svh] flex flex-col">
      <header className="w-full h-[10%] border-b border-black px-10 flex items-center">
        <div className="text-[20px] font-bold font-mono">AI PDF Reader</div>
      </header>

      <main className="w-full h-[90%] bg-black relative">
        {/* ANSWER CONTAINER */}
        <div className="w-full h-[93%] px-10">

          {conversations?.map((conversation, index) => (
            <div key={index} className="">
              <p>{conversation.question}</p>
              <p>{conversation.answer}</p>
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
    </div>
  );
}
