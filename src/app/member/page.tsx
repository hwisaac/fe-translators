'use client';
import { loginAtom } from '@/atoms/loginAtom';
import ScreenLoading from '@/components/ScreenLoading';
import PageLayout from '@/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function page({}) {
  const [isClient, setIsClient] = useState(false);
  const loginState = useRecoilValue(loginAtom);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      if (!loginState) {
        router.push('/member/login');
      } else if (loginState.is_staff) {
        router.push('/admin/tasks');
      } else {
        router.push('/member/my-page');
      }
    }
  }, [isClient, loginState, router]);

  return <ScreenLoading isLoading={true} />;
}
