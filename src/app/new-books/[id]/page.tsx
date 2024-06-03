import PageLayout from '@/layouts/PageLayout';
import BASE_URL from '@/utils/BASE_URL';
import getImgUrl from '@/utils/getImgUrl';
import Image from 'next/image';
import Link from 'next/link';
import { FaBook } from 'react-icons/fa';

type Props = {
  params: { id: number };
};

type NewBookDetailType = {
  id: number;
  created_at: string;
  updated_at: string;
  thumbnail: string;
  title: string;
  description: string;
  publisher: string;
  author: string;
  translator: string;
};

export default async function page({ params: { id } }: Props) {
  const data: NewBookDetailType = await fetch(
    `${BASE_URL}/new-books/${id}`
  ).then((res) => res.json());
  return (
    <PageLayout title='신간 안내'>
      <div className='mt-[80px] lg:hidden'></div>

      <h1 className='text-lg lg:text-3xl py-5 mb-10 border-b border-b-slate-700'>
        {data.title}
      </h1>
      <section className='flex flex-col sm:flex-row items-center sm:items-start gap-20'>
        <div>
          {data.thumbnail ? (
            <Image
              src={getImgUrl(data.thumbnail)}
              alt={`신간 도서-${data.title}`}
              width={150}
              height={200}
              className='shrink-0 w-[150px] h-[200px]'
              style={{
                objectFit: 'cover',
              }}
            />
          ) : (
            <div className='w-[100px] h-[150px] bg-slate-50 rounded-md flex items-center justify-center'>
              <FaBook size={60} className='text-slate-200' />
            </div>
          )}
        </div>
        <ul className='space-y-3 bg-slate-50 sm:bg-transparent w-full px-2 py-4 sm:py-2 flex flex-col justify-center'>
          <li className='flex'>
            <span className='w-[100px] text-blue-500 font-thin'>출판사</span>
            <p className='text-slate-500'>{data.publisher}</p>
          </li>
          <li className='flex'>
            <span className='w-[100px] text-blue-500 font-thin'>저자</span>
            <p className='text-slate-500'>{data.author}</p>
          </li>
          <li className='flex'>
            <span className='w-[100px] text-blue-500 font-thin'>번역가</span>
            <p className='text-slate-500'>{data.translator}</p>
          </li>
        </ul>
      </section>

      <section className='shadow-md rounded-md px-2 sm:px-10 lg:px-20 py-4 sm:py-10 mt-5 font-thin'>
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      </section>
      <Link href='/new-books' className='btn mt-10'>
        목록
      </Link>
    </PageLayout>
  );
}
