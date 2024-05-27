import Image from 'next/image';
import banner1 from '/public/home/img-main-banner1.png';
type Props = {};

export default function Slider({}: Props) {
  return (
    <div className=' bg-slate-50 mt-[100px] lg:mt-0'>
      <div className='flex justify-center items-center'>
        <Image
          alt='배너1'
          src={banner1}
          className='w-full'
          placeholder='blur'
        />
        <div className='absolute text-slate-200/90 w-full xl:w-[40%] flex flex-col gap-3 items-center'>
          <p className='text-3xl sm:text-4xl lg:text-6xl font-thin'>
            좋은 책 만들기의 시작은
          </p>
          <p className='text-3xl sm:text-4xl lg:text-6xl'>올바른 번역입니다</p>
          <span className='text-lg md:text-md text-white/80 relative top-6'>
            Making a good book begins with the correct translation
          </span>
        </div>
      </div>
      {/* <img src={banner2} className='w-full'/> */}
    </div>
  );
}
