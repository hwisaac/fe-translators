import MemberTabs from '@/components/member/MemberTabs';
import Container from '@/layouts/Container';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function MemberLayout({ children }: Props) {
  return (
    <section className='w-full flex flex-col items-center justify-center pb-20'>
      <MemberTabs />
      <Container>{children}</Container>
    </section>
  );
}
