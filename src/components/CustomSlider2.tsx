'use client';

import img from '@/utils/img';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Props = {};

export default function CustomSlider2({}: Props) {
  const [left, setLeft] = useState(true);
  const slideRef = useRef(null);

  useEffect(() => {
    if (slideRef.current) {
      if (left) {
        // @ts-ignore
        slideRef.current.style.transform = 'translateX(0)';
      } else {
        // @ts-ignore
        slideRef.current.style.transform = 'translateX(-100%)';
      }
    }
  }, [left]);

  const handleSlide = () => {
    setLeft((prev) => !prev);
  };
  return (
    <section className='w-full h-[700px] bg-red-400 flex overflow-hidden relative'>
      <div
        ref={slideRef}
        className='flex transition-transform duration-500 ease-in-out w-full'>
        <div className='w-full h-[700px] bg-blue-500 shrink-0 flex items-center justify-center'>
          <Image
            alt='배너1'
            src={img.mainBanner1}
            className='absolute'
            placeholder='blur'
            style={{ objectFit: 'cover' }}
          />
          <div className='text-slate-200/90 w-full xl:w-[40%] flex flex-col gap-3 items-center justify-center absolute'>
            <div className='flex flex-col items-center space-y-[20px]'>
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
        <div className='w-full h-[700px] bg-green-500 shrink-0 flex items-center justify-center'>
          <Image
            alt='배너2'
            src={img.mainBanner2}
            className='absolute'
            placeholder='blur'
            style={{ objectFit: 'cover' }}
          />
          <div className='text-slate-200/90 w-full xl:w-[70%] flex gap-3 items-center justify-center absolute'>
            <div className='font-thin space-y-[20px] flex flex-col items-center'>
              <p className='text-3xl sm:text-4xl lg:text-6xl'>
                출판사에게는 <span className='font-semibold'>양질의 번역</span>
                을,
              </p>
              <p className='text-3xl sm:text-4xl lg:text-6xl'>
                번역가에게는{' '}
                <span className='font-semibold'>안정적인 작업환경</span>을
              </p>
              <span className='text-lg md:text-md text-white/80 relative top-6 font-thin'>
                Quality translation for publishers and stable work environment
                for translators
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className='absolute bottom-10 left-1/2 transform -translate-y-1/2 text-white p-2 flex gap-3'
        onClick={handleSlide}>
        <div
          className={`h-4 border-2 border-white rounded-full cursor-pointer transition-all ${
            left ? 'w-10 bg-white' : 'w-4'
          }`}></div>
        <div
          className={`h-4 border-2 border-white rounded-full cursor-pointer transition-all ${
            left ? 'w-4' : 'bg-white w-10'
          }`}></div>
      </div>
    </section>
  );
}
