import ChevronRight from '@/icons/ChevronRight';
import Link from 'next/link';
import { FaRegHandshake } from 'react-icons/fa6';

type Props = {};

export default function SectionOne({}: Props) {
  return (
    <section className='w-full'>
      <div className='w-full max-w-6xl mx-auto flex flex-col'>
        <div className='flex border-b items-end gap-8 py-4 my-10 px-2'>
          <h2 className='text-4xl text-slate-900'>바른번역 소개</h2>
          <span className='text-slate-500'>우리는 이렇게 다릅니다</span>
        </div>
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
            <div className='flex flex-col gap-2'>
              <Link href='/introduction/difference'>
                <div className='flex justify-between items-center text-white bg-blue-600 px-10 py-7'>
                  <div className='flex flex-col gap-2'>
                    <p>바른번역이</p>{' '}
                    <p className='text-3xl'>
                      <span className=' font-bold'>출판사</span>에게 좋은이유
                    </p>
                  </div>
                  <div className='bg-blue-800 w-[100px] h-[100px] rounded-full'></div>
                </div>
              </Link>
              <Link href='/request/qna' className='text-blue-500 text-2xl'>
                <div className='flex items-center justify-between bg-blue-50 px-10 py-5 '>
                  <p>
                    <span className='text-blue-700 font-semibold'>
                      번역의뢰 전에
                    </span>{' '}
                    꼭 읽어주세요
                  </p>
                  <ChevronRight className='text-blue-700' />
                </div>
              </Link>
            </div>
            <div className='flex flex-col gap-2'>
              <Link href='/introduction/difference'>
                <div className='flex justify-between items-center text-white bg-emerald-600 px-10 py-7'>
                  <div className='flex flex-col gap-2'>
                    <p>바른번역이</p>
                    <p className='text-3xl'>
                      <span className=' font-bold'>번역가</span>에게 좋은이유
                    </p>
                  </div>
                  <div className='bg-emerald-800 w-[100px] h-[100px] rounded-full'></div>
                </div>
              </Link>
              <Link
                href='/participation-guide'
                className='text-emerald-500 text-2xl'>
                <div className='flex items-center justify-between bg-emerald-50 px-10 py-5'>
                  <p>
                    <span className='text-emerald-700 font-semibold'>
                      회원가입 전에
                    </span>{' '}
                    꼭 읽어주세요
                  </p>
                  <ChevronRight className='text-emerald-700' />
                </div>
              </Link>
            </div>
          </div>
          <Link href='/introduction/partnership'>
            <div className='flex items-center justify-center h-[150px] my-10 bg-blue-800 text-white gap-10 text-3xl'>
              <p className=' '>
                바른번역이 원하는 <span className='font-bold'>파트너쉽</span>
              </p>{' '}
              <FaRegHandshake size={45} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
