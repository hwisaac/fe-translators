import Container from '@/layouts/Container';
import img from '@/utils/img';
import Image from 'next/image';
type Props = { children?: any; title: string };

export default function PageLayout({ children, title }: Props) {
  return (
    <section className='w-full flex flex-col items-center justify-center bg-slate-100 pb-20'>
      <div className='flex items-center justify-center mb-10'>
        <Image src={img.bgPatter} alt='bgImage' />
        <h1 className='absolute text-white text-4xl'>{title}</h1>
      </div>
      <Container>{children}</Container>
    </section>
  );
}
