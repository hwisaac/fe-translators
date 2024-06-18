'use client';

import useMe from '@/app/hooks/useMe';
import AdminTabs from '@/components/admin/AdminTabs';
import AdminProtectPageLayout from '@/layouts/AdminProtectPageLayout';
import Container from '@/layouts/Container';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const [isClient, setIsClient] = useState(false);
  const { loginState } = useAuthStore();

  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (isClient === false) {
    return (
      <div className='w-full h-[500px] flex items-center justify-center'>
        <span className='loading loading-spinner loading-lg' />
      </div>
    );
  }

  if (loginState?.user?.is_staff) {
    return (
      <section className='w-full flex flex-col items-center justify-center pb-20'>
        <AdminTabs />
        <Container>{children}</Container>
      </section>
    );
  } else {
    return (
      <div className='h-[500px] w-full flex justify-center items-center flex-col gap-3'>
        권한이 없습니다
        <button className='btn ' onClick={() => router.push('/')}>
          홈으로
        </button>
      </div>
    );
  }
}
