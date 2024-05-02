'use client';
import useMe from '@/app/hooks/useMe';
import MemberTabs from '@/components/member/MemberTabs';
import Container from '@/layouts/Container';
import React, { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function MemberLayout({ children }: Props) {
  const [isClient, setIsClient] = useState(false);
  const { isLoading } = useMe(); // useMe 에서 자동으로 token 인증을 확인해줌
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
  return (
    <section className='w-full flex flex-col items-center justify-center pb-20'>
      <MemberTabs />
      <Container>{children}</Container>
    </section>
  );
}
