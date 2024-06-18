'use client';

import ScreenLoading from '@/components/ScreenLoading';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function page({}) {
  const [isClient, setIsClient] = useState(false);
  const { loginState } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      if (loginState === null) {
        router.push('/member/login');
      } else if (loginState?.user?.is_staff) {
        router.push('/admin/tasks');
      } else {
        router.push('/member/my-page');
      }
    }
  }, [isClient, loginState, router]);

  return <ScreenLoading isLoading={true} />;
}
