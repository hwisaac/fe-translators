'use client';

import BrSM from '@/components/BrSM';
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

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlide();
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSlide = () => {
    setLeft((prev) => !prev);
  };
  return (
    <section className='w-full h-[400px] lg:h-[669px] flex items-center justify-center overflow-hidden relative bg-red-500'>
      <div
        ref={slideRef}
        className='flex transition-transform duration-500 ease-in-out w-full h-[669px] bg-orange-500'>
        <div className='w-full lg:h-[669px] shrink-0 flex items-center justify-center bg-blue-500 relative'>
          <Image
            alt='배너1'
            src={img.mainBanner1}
            className='absolute w-full h-full'
            placeholder='blur'
            style={{ objectFit: 'cover' }}
          />
          <div className='text-slate-200/90 w-full xl:w-[40%] flex flex-col gap-3 items-center justify-center absolute px-2'>
            <div className='flex flex-col sm:items-center lg:space-y-[20px]'>
              <p className='text-3xl sm:text-4xl lg:text-6xl font-thin'>
                좋은 책 만들기의 시작은
              </p>
              <p className='text-3xl sm:text-4xl lg:text-6xl'>
                올바른 번역입니다
              </p>
              <span className='text-sm md:text-md text-white/80 relative top-6 font-thin'>
                Making a good book begins with the correct translation
              </span>
            </div>
          </div>
        </div>
        <div className='w-full lg:h-[669px] shrink-0 flex items-center justify-center bg-green-500 relative'>
          <Image
            alt='배너2'
            src={img.mainBanner2}
            className='absolute w-full h-full'
            placeholder='blur'
            style={{ objectFit: 'cover' }}
          />
          <div className='text-slate-200/90 w-full xl:w-[70%] flex gap-3 items-center justify-center absolute px-2'>
            <div className='font-thin  lg:space-y-[20px] flex flex-col sm:items-center'>
              <p className='text-3xl sm:text-4xl lg:text-6xl'>
                출판사에게는 <span className='font-semibold'>양질의 번역</span>
                을,
              </p>
              <p className='text-3xl sm:text-4xl lg:text-6xl text-wrap '>
                번역가에게는{' '}
                <span className='font-semibold'>
                  안정적인 <BrSM /> 작업환경
                </span>
                을
              </p>
              <span className='text-sm md:text-md text-white/80 relative top-6 font-thin'>
                Quality translation for publishers and stable work{' '}
                <br className='sm:hidden' /> environment for translators
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className='absolute bottom-10  transform -translate-y-1/2 text-white p-2 flex gap-3'
        onClick={handleSlide}>
        <div
          className={`h-3 border-2 border-white rounded-full cursor-pointer transition-all ${
            left ? 'w-8 bg-white' : 'w-3'
          }`}></div>
        <div
          className={`h-3 border-2 border-white rounded-full cursor-pointer transition-all ${
            left ? 'w-3' : 'bg-white w-8'
          }`}></div>
      </div>
    </section>
  );
}
