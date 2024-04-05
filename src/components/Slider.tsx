import Image from 'next/image';
import banner1 from '/public/home/img-main-banner1.png';
type Props = {};

export default function Slider({}: Props) {
  return (
    <div className=' bg-orange-500/50 '>
      <div className='flex justify-center items-center'>
        <Image alt='배너1' src={banner1} className='w-full' />
        <div className='absolute text-slate-200/90 w-[40%] flex flex-col gap-3 items-center'>
          <p className='text-6xl'>좋은 책 만들기의 시작은</p>
          <p className='text-6xl'>올바른 번역입니다</p>
          <span className='text-white/80 relative top-6'>
            Making a good book begins with the correct translation
          </span>
        </div>
      </div>
      {/* <img src={banner2} className='w-full'/> */}
    </div>
  );
}
