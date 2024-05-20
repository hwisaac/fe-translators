import Container from '@/layouts/Container';
import img from '@/utils/img';
import Image from 'next/image';

type Props = {};

export default function MapSection({}: Props) {
  return (
    <Container>
      <div className='border-b flex flex-col'>
        <div className='bg-slate-100 w-full h-[400px]'>
          <Image
            src={img.map}
            alt='map'
            className='h-full object-cover'
            placeholder='blur'
          />
        </div>
        <div className='w-full flex flex-col lg:flex-row justify-between items-center px-10 my-5 text-slate-700 gap-4'>
          <p className='text-2xl'>서울시 마포구 어울마당로 26 제일빌딩 5층</p>
          <ul className='flex divide-x-2'>
            <li className='px-5'>
              <span className='text-blue-500'>TEL</span> 02-338-2180
            </li>
            <li className='px-5'>
              <span className='text-blue-500'>FAX</span> 02-338-2146
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
