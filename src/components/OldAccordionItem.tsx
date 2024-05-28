'use client';

import ChevronDown from '@/icons/ChevronDown';
import ChevronUp from '@/icons/ChevronUp';
import { useState } from 'react';

type Props = {
  answer: string;
  question: string;
};

export default function OldAccordionItem({ answer, question }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className='border border-b-0 last:border-b'>
      <div
        className='flex py-4 lg:py-10 lg:px-10 cursor-pointer'
        onClick={() => setOpen((p) => !p)}>
        <p className='text-[#2e63c8] w-10 lg:w-20 flex justify-center shrink-0 lg:text-3xl'>
          Q
        </p>
        <p className='text-slate-800 w-full text-sm px-2  lg:text-2xl'>
          {question}
        </p>
        <div className='w-10 lg:w-20 shrink-0 flex items-center justify-center'>
          {open ? (
            <ChevronUp className='lg:text-[30px]' />
          ) : (
            <ChevronDown className='lg:text-[30px]' />
          )}
        </div>
      </div>
      {open && (
        <div className='flex bg-stone-100 py-4 lg:py-10 lg:px-10'>
          <p className='text-slate-500 w-10 lg:w-20 flex justify-center shrink-0 lg:text-3xl'>
            A
          </p>
          <p className=' font-thin text-sm px-2 text-slate-400 whitespace-pre-wrap lg:text-xl'>
            {answer}
          </p>
          <div className='w-10 lg:w-20 shrink-0 flex items-center justify-center'></div>
        </div>
      )}
    </div>
  );
}
