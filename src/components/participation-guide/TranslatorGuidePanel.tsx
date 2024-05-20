'use client';
import { FaCircleExclamation } from 'react-icons/fa6';

import React, { SyntheticEvent, useState } from 'react';
import Image from 'next/image';
import img from '@/utils/img';

type Props = {};
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && children}
    </div>
  );
}

export default function TranslatorGuidePanel({ value }: any) {
  return (
    <CustomTabPanel value={value} index={0}>
      <div className='flex flex-col items-center text-lg lg:text-3xl text-slate-700 mt-20 mb-32'>
        <p>이제 번역가는 번역에만 충실할 수 있습니다.</p>
        <p>'바른번역'의 문은 언제나 열려 있습니다.</p>
        <p>
          이곳은 번역가들이 모여 만드는 곳입니다. 실력있는 번역가들은 언제나
          환영합니다.
        </p>
      </div>

      <section className='border-2 relative h-[400px] w-full flex flex-col justify-end'>
        <Image
          src={img.coffeeBg}
          alt='backgroundImage'
          layout='fill'
          style={{
            objectFit: 'cover',
          }}
          className=''
          placeholder='blur'
        />
        <div className='h-full backdrop-brightness-50 flex flex-col justify-end'>
          <div className='z-10 '>
            <h3 className='text-slate-300 px-5 lg:px-20 text-lg lg:text-4xl'>
              기성 번역가이십니까?
            </h3>
            <p className='text-slate-300 drop-shadow px-5 lg:px-20 mt-7 mb-10 text-xs lg:text-lg'>
              번역서를 내신 적이 있는 번역가는 번역서를 포함한 간단한 프로필과
              샘플 번역본을 보내주시면 담당자가 연락드리겠습니다. <br />
              현재 바른번역은 역서가 5권 이상인 분만 받아들이고 있습니다.
            </p>
          </div>
          <div className='flex flex-col lg:flex-row items-center gap-4 text-slate-300 border-t border-t-white/15 py-4 z-10'>
            <p className='font-semibold text-lg lg:text-2xl px-20'>
              프로필과 원고 보내실 곳
            </p>
            <p className='text:sm lg:text-2xl'>
              book@barunmc.com / 02-338-2180
            </p>
          </div>
        </div>
      </section>

      <section className='flex px-3 gap-3 mt-10 mb-20'>
        <FaCircleExclamation className='relative top-1 text-slate-600' />
        <div className='text-slate-600'>
          <p>일어는 입부 입회를 받지 않습니다.</p>
          <p>
            입회를 희망하시는 영어, 독일어, 프랑스어, 중국어 번역가는 위 내용
            참고하여 연락주시기 바랍니다.
          </p>
          <p>
            참고로, 역서 5권 이상이신 분들도 리뷰부터 작업 시작하셔야 합니다.
          </p>
        </div>
      </section>
      <section className='border-2 relative h-[400px] w-full flex flex-col justify-end'>
        <Image
          src={img.coffeeBg2}
          alt='backgroundImage'
          layout='fill'
          style={{
            objectFit: 'cover',
          }}
          className=''
          placeholder='blur'
        />
        <div className='h-full backdrop-brightness-50 flex flex-col justify-end'>
          <div className='z-10 '>
            <h3 className='text-slate-300 px-5 lg:px-20 text-lg lg:text-4xl'>
              번역가 지망생입니까?
            </h3>
            <p className='text-slate-300 drop-shadow px-5 lg:px-20 mt-7 mb-10 text-xs lg:text-lg'>
              바른번역 번역가들은 번역 지망생들을 위해 번역 아카데미를
              개설하였습니다.
              <br />
              그곳에서 실력이 향상되도록 물심양면으로 도와드리겠습니다.
            </p>
          </div>
          <div className='flex flex-col lg:flex-row items-center  gap-4 text-slate-300 border-t border-t-white/15 py-4 z-10'>
            <p className='font-semibold text-lg lg:text-2xl px-20'>
              글밥 아카데미 방문하기
            </p>
            <p className='text:sm lg:text-2xl'>www.glbab.com</p>
          </div>
        </div>
      </section>
    </CustomTabPanel>
  );
}
