import img from '@/utils/img';
import Image from 'next/image';
type Props = { children?: any; title: string };

export default function PageLayout({ children, title }: Props) {
  return (
    <section className='w-full relative'>
      <div className='hidden lg:flex items-center justify-center mb-4'>
        <Image src={img.bgPattern} alt='bgImage' />
        <h1 className='text-3xl absolute text-white'>{title}</h1>
      </div>

      <div className='w-full mb-10 bg-red-400 relative'>
        <div className='w-full max-w-6xl mx-auto px-4 relative top-7'>
          {children}
        </div>
      </div>
    </section>
  );
}
