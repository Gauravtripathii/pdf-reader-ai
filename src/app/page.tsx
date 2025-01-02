"use client";

import AttachFileIcon from '@mui/icons-material/AttachFile';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Home() {
  return (
    <div className="w-full h-[100svh] flex flex-col">
      <header className="w-full h-[10%] border-b border-black px-10 flex items-center">
        <div className="text-[20px] font-bold font-mono">AI PDF Reader</div>
      </header>

      <main className="w-full h-[90%] bg-black">
        {/* ANSWER CONTAINER */}
        <div className="w-full h-[93%] px-10"></div>

        {/* QUESTIONS CONTAINER */}
        <div className="w-full h-[7%] border-t border-slate-500 flex items-center px-10 py-2">
          <p className='pr-2'>
            <AttachFileIcon />
          </p>
          <p className='w-full h-full'>
            <input type="text" placeholder='Type your query here...' className='w-full h-full rounded-full px-5 text-black' />
          </p>
          <p className='pl-2'>
            <AutoAwesomeIcon />
          </p>
        </div>
      </main>
    </div>
  );
}
