'use client';
import { loginAtom } from '@/atoms/loginAtom';
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
  if (!isClient) return null;
  if (!loginState) {
    router.push('/member/login');
  } else if (loginState.is_staff) {
    router.push('/admin/tasks');
  } else {
    router.push('/member/my-page');
  }

  return (
    <PageLayout title='번역가방'>
      <div className='w-full flex justify-center'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    </PageLayout>
  );
}
