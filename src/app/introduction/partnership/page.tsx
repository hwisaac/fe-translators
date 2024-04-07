import img from '@/utils/img';
import Image from 'next/image';

type Props = {};

export default function page({}: Props) {
  return (
    <section className='w-full flex flex-col items-center justify-center bg-slate-100 pb-20'>
      <div className='flex items-center justify-center mb-10'>
        <Image src={img.bgPatter} alt='bgImage' />
        <h1 className='absolute text-white text-4xl'>
          바른번역이 원하는 파트너십
        </h1>
      </div>
    </section>
  );
}
