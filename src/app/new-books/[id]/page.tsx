import PageLayout from '@/layouts/PageLayout';
import BASE_URL from '@/utils/BASE_URL';
import { formatTextField } from '@/utils/formatTextField';
import getImgUrl from '@/utils/getImgUrl';
import Link from 'next/link';

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
      <section className='flex flex-col sm:flex-row gap-20'>
        <div>
          <img src={getImgUrl(data.thumbnail)} />
        </div>
        <ul className='space-y-3 bg-slate-50 sm:bg-transparent w-full px-2 py-4 flex flex-col justify-center'>
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

      <section className='bg-slate-50 shadow-md px-2 sm:px-10 lg:px-20 py-4 sm:py-10 mt-5 font-thin'>
        {formatTextField(data.description)}
      </section>
      <Link href='/new-books' className='btn mt-10'>
        목록
      </Link>
    </PageLayout>
  );
}
