import Container from '@/layouts/Container';
import img from '@/utils/img';
import Image from 'next/image';
type Props = { children?: any; title: string };

export default function PageLayout({ children, title }: Props) {
  return (
    <section className='w-full flex flex-col items-center justify-center  pb-20'>
      <div className='hidden lg:flex items-center justify-center mb-10'>
        <Image src={img.bgPattern} alt='bgImage' />
        <h1 className='absolute text-white text-4xl'>{title}</h1>
      </div>
      <Container>{children}</Container>
    </section>
  );
}
