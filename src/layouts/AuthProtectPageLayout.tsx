'use client';

import Container from '@/layouts/Container';
import img from '@/utils/img';
import { useAuthStore } from '@/zustand/useAuthStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = { children?: any; title: string };

export default function AuthProtectPageLayout({ children, title }: Props) {
  const { loginState } = useAuthStore();
  const router = useRouter();
  if (loginState?.user?.is_staff) {
    router.push('/admin/tasks');
  } else {
    router.push('/member/my-page');
  }
  return <div>Loading...</div>;
  // return (
  //   <section className='w-full flex flex-col items-center justify-center  pb-20'>
  //     <div className='flex items-center justify-center mb-10'>
  //       <Image src={img.bgPattern} alt='bgImage' />
  //       <h1 className='absolute text-white text-4xl'>{title}</h1>
  //     </div>
  //     <Container>{children}</Container>
  //   </section>
  // );
}
