'use client';
import useIsStaff from '@/app/hooks/useIsStaff';
import useLocalToken from '@/app/hooks/useLocalToken';
import ScreenLoading from '@/components/ScreenLoading';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function page({}) {
  const [isClient, setIsClient] = useState(false);
  const { token } = useLocalToken();
  const { isStaff } = useIsStaff();
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      if (token === null) {
        router.push('/member/login');
      } else if (isStaff) {
        router.push('/admin/tasks');
      } else {
        router.push('/member/my-page');
      }
    }
  }, [isClient, isStaff, router]);

  return <ScreenLoading isLoading={true} />;
}
