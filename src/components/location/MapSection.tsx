import Container from '@/layouts/Container';
import img from '@/utils/img';
import Image from 'next/image';

type Props = {};

export default function MapSection({}: Props) {
  return (
    <div className='mt-[80px] lg:mt-10'>
      <div className='flex flex-col'>
        <div className='bg-slate-100 w-full h-[400px]'>
          <Image
            src={img.map}
            alt='map'
            className='h-full object-cover'
            placeholder='blur'
          />
        </div>
        <div className='w-full flex flex-col lg:flex-row justify-between items-start sm:items-center px-2 sm:px-10 mb-5 py-4 sm:py-10 text-slate-700 gap-4 border border-t-0'>
          <p className='text-md sm:text-2xl'>
            서울시 마포구 어울마당로 26 제일빌딩 5층
          </p>
          <ul className='flex divide-x-2 font-thin'>
            <li className='pr-2 sm:px-5 text-sm sm:text-lg'>
              <span className='text-blue-500'>TEL</span> 02-338-2180
            </li>
            <li className='pl-2 sm:px-5 text-sm sm:text-lg'>
              <span className='text-blue-500'>FAX</span> 02-338-2146
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
