type Props = {};
import ChevronRight from '@/icons/ChevronRight';
import mainPic1 from '../../../public/home/img-main-picture1.png';
import mainPic2 from '../../../public/home/img-main-picture2.png';
import mainPic3 from '../../../public/home/img-main-picture3.png';

import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';

export default function SectionThree({}: Props) {
  return (
    <section className='w-full mb-14'>
      <div className='w-full max-w-6xl mx-auto space-y-5'>
        <ul className='grid grid-cols-3'>
          <li>
            <Image alt='barun-image1' src={mainPic1} />
          </li>
          <li>
            <Image alt='barun-image1' src={mainPic2} />
          </li>
          <li>
            <Image alt='barun-image1' src={mainPic3} />
          </li>
        </ul>
        <ul className='grid grid-cols-3'>
          <li className='bg-blue-400 h-[130px] text-white flex flex-col justify-center px-10'>
            <p className=' font-thin'>바른번역</p>
            <div className='flex items-center gap-3 text-2xl'>
              <p>글밥 아카데미</p> <ChevronRight />
            </div>
          </li>
          <li className='bg-green-400 h-[130px] text-white flex flex-col justify-center px-10'>
            <p className=' font-thin'>네이버카페</p>
            <div className='flex items-center gap-3 text-2xl'>
              <p>글로 먹고 살기</p> <ChevronRight />
            </div>
          </li>
          <li className='bg-orange-400 h-[130px] text-white flex flex-col justify-center px-10'>
            <p className=' font-thin'>바른번역</p>
            <div className='flex items-center gap-3 text-2xl'>
              <p>영상번역 및 편집</p> <ChevronRight />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
