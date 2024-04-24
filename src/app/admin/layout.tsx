import AdminTabs from '@/components/admin/AdminTabs';
import Container from '@/layouts/Container';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <section className='w-full flex flex-col items-center justify-center pb-20'>
      <AdminTabs />
      <Container>{children}</Container>
    </section>
  );
}
