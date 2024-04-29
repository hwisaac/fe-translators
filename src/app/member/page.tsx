'use client';
import { loginAtom } from '@/atoms/loginAtom';
import PageLayout from '@/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

type Props = { children?: any; title: string };

export default function page({}: Props) {
  const loginState = useRecoilValue(loginAtom);
  const router = useRouter();
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
