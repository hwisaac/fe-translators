'use client';
import Image from 'next/image';
import banner1 from '/public/home/img-main-banner1.png';
import img from '@/utils/img';
import { useState } from 'react';

type Props = {};

export default function CustomSlider({}: Props) {
  return (
    <div className='w-full bg-slate-50 mt-[100px] lg:mt-0 flex'>
      {/* 첫번째 슬라이드 */}
      <div className='flex justify-center items-center w-full h-[800px] shrink-0'>
        <Image
          alt='배너1'
          src={img.mainBanner1}
          className='absolute'
          placeholder='blur'
          style={{ objectFit: 'cover' }}
        />
        <div className='text-slate-200/90 w-full xl:w-[40%] flex flex-col gap-3 items-center justify-center absolute'>
          <div>
            <p className='text-3xl sm:text-4xl lg:text-6xl font-thin'>
              좋은 책 만들기의 시작은
            </p>
            <p className='text-3xl sm:text-4xl lg:text-6xl'>
              올바른 번역입니다
            </p>
            <span className='text-lg md:text-md text-white/80 relative top-6 font-thin'>
              Making a good book begins with the correct translation
            </span>
          </div>
        </div>
      </div>
      <div className='flex bg-red-500 w-full h-[800px]'> </div>
    </div>
  );
}
