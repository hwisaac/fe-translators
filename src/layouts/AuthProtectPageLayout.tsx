'use client';
import useIsStaff from '@/app/hooks/useIsStaff';
import Container from '@/layouts/Container';
import img from '@/utils/img';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = { children?: any; title: string };

export default function AuthProtectPageLayout({ children, title }: Props) {
  const { isStaff } = useIsStaff();
  const router = useRouter();
  if (isStaff) {
    router.push('/admin/tasks');
  } else if (isStaff) {
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
