'use client';
import { loginAtom } from '@/atoms/loginAtom';
import Container from '@/layouts/Container';
import img from '@/utils/img';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useRecoilValue } from 'recoil';
type Props = { children?: any; title: string };

export default function AuthProtectPageLayout({ children, title }: Props) {
  const loginState = useRecoilValue(loginAtom);
  const router = useRouter();
  if (loginState && loginState.is_staff) {
    router.push('/admin/tasks');
  } else if (loginState && !loginState.is_staff) {
    router.push('/member/my-page');
  }

  return (
    <section className='w-full flex flex-col items-center justify-center  pb-20'>
      <div className='flex items-center justify-center mb-10'>
        <Image src={img.bgPattern} alt='bgImage' />
        <h1 className='absolute text-white text-4xl'>{title}</h1>
      </div>
      <Container>{children}</Container>
    </section>
  );
}
