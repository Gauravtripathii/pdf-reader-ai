"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Image from 'next/image';

export default function Home() {
  const [previewState, setPreviewState] = useState<boolean>(false);
  return (
    <div className="w-screen h-full overflow-x-clip relative">

      {/* BACKGROUND */}
      <div className="absolute z-0 top-0 left-0 w-full h-full flex">
        <div className="circle h-96 w-96 rounded-full bg-[#3e9cec] absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4"></div>
        <div className="circle h-96 w-96 rounded-full bg-[#f84dd3] absolute right-0 top-0 translate-y-[100%] translate-x-1/4"></div>
      </div>

      {/* MAIN */}
      <div className="w-full z-20 top-0 left-0 backdrop-blur-3xl">
        {/* BACKGROUND TRANS BOX */}
        {/* <div className="absolute top-0 left-0 z-10 w-full h-full bg-white"></div> */}

        <Header />

        <main className="w-full z-50 flex flex-col gap-10 items-center pt-20">

          <h1 className="w-1/3 text-[50px] text-center font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Free, AI-powered answers from your PDFs—effortless and instant.</h1>

          <Link href="/ai" className='bg-white text-blue-600 font-bold px-5 py-3 rounded-xl border-2 border-white hover:bg-[rgba(0,0,0,0)] text-[20px]'>Get Started &rarr;</Link>

          <div className="screenshot w-3/4 border rounded-xl overflow-clip p-2 bg-white relative" onMouseEnter={() => setPreviewState(true)} onMouseLeave={() => setPreviewState(false)}>
            {previewState && (
              <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.8)] cursor-pointer font-mono flex items-center justify-center text-[40px]">Preview</div>
            )}
            <Image alt='screenshot' src="/screenshot.png" width={1900} height={1900} className='w-full h-full rounded-xl' />
          </div>

        </main>

        <footer className="flex items-center justify-center gap-1 p-10">
          &#11088;
          <a href='https://github.com/Gauravtripathii/' target='_blank' className="font-mono underline text-[18px]">github.com/Gauravtripathii/</a>
          &#11088;
        </footer>
      </div>
    </div>
  );
}
