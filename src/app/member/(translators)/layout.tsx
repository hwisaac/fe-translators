'use client';
import useMe from '@/app/hooks/useMe';
import MemberTabs from '@/components/member/MemberTabs';
import Container from '@/layouts/Container';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function MemberLayout({ children }: Props) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isLoading, data } = useMe(); // useMe 에서 자동으로 token 인증을 확인해줌
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient || isLoading) {
    return (
      <div className='w-full h-[500px] flex items-center justify-center'>
        <span className='loading loading-spinner loading-lg' />
      </div>
    );
  }
  if (data && !data.is_translator) {
    return (
      <div className='w-full h-[500px] flex flex-col gap-3 items-center justify-center'>
        <span className=''>번역가방에 입장하실 수 없는 회원입니다.</span>
        <button onClick={() => router.push('/')} className='btn'>
          홈으로
        </button>
      </div>
    );
  }
  if (data && data.is_translator) {
    return (
      <section className='w-full flex flex-col items-center justify-center pb-20'>
        <MemberTabs />
        <Container>{children}</Container>
      </section>
    );
  }
}
