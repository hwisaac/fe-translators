import PageLayout from '@/layouts/PageLayout';
import { FaBook } from 'react-icons/fa';
import dummyImage from '@/utils/dummyImage';
import { GetNewBooksType, NewBookType } from '@/components/home/SectionTwo';
import BASE_URL from '@/utils/BASE_URL';
import getImgUrl from '@/utils/getImgUrl';
import Link from 'next/link';
import NewBooksPagination from '@/components/new-books/NewBooksPagination';
import NewBooksSearchForm from '@/components/new-books/NewBooksSearchForm';
import Image from 'next/image';
import BrSM from '@/components/BrSM';

type Props = {
  searchParams: { page: string; query: string; option: string };
};

type NewBookDetailType = {
  id: number | string;
  title: string;
  content: string;
  publisher: string;
  author: string;
  translator: string;
  thumbnail: string;
};

export default async function page({
  searchParams: { page, query, option },
}: Props) {
  const data: GetNewBooksType = await fetch(
    `${BASE_URL}/new-books?page=${page || 1}&query=${query || ''}&option=${
      option || ''
    }&/`,
    {
      cache: 'no-cache',
    }
  ).then((res) => res.json());

  return (
    <PageLayout title='신간안내'>
      <div className='w-full h-[80px] lg:hidden ' />
      <h1 className='lg:hidden text-2xl mb-4'>신간안내</h1>
      <div className='bg-gray-50 flex flex-col lg:flex-row items-center py-6 gap-3 px-6'>
        <p className='text-center'>
          2020년 12월 이후 출간작부터
          <BrSM /> 업데이트됩니다.
        </p>
        <Link
          href={`https://cafe.naver.com/glbab?iframe_url=/ArticleList.nhn%3Fsearch.clubid=21911446%26search.menuid=28`}
          target='_blank'>
          <div className='border border-black bg-white font-thin text-gray-400 px-3 py-1 text-sm lg:text-md hover:text-gray-800 hover:font-normal'>
            이전 출간작 보러가기
          </div>
        </Link>
      </div>
      <NewBooksSearchForm />
      <NewBooksTable
        new_books={data?.new_books ?? []}
        total_pages={data.total_pages}
      />
    </PageLayout>
  );
}

function createData(
  id: number,
  title: string,
  publisher: string,
  author: string,
  translator: string
) {
  return { id, title, author, publisher, translator, thumbnail: dummyImage };
}

function NewBooksTable({
  new_books,
  total_pages,
}: {
  new_books: NewBookType[];
  total_pages: number;
}) {
  return (
    <section className='my-10'>
      <table className='hidden sm:table'>
        <thead>
          <tr>
            <th className='w-[150px]' align='center'>
              사진
            </th>
            <th>제목</th>
            <th className='hidden lg:table-cell' align='center'>
              출판사
            </th>
            <th className='hidden lg:table-cell' align='center'>
              저자
            </th>
            <th align='center'>번역가</th>
          </tr>
        </thead>
        <tbody>
          {new_books.map((book) => (
            <tr key={book.id} className=''>
              <td>
                <Link href={`/new-books/${book.id}`}>
                  {getImgUrl(book.thumbnail) ? (
                    <Image
                      src={getImgUrl(book.thumbnail)}
                      alt={book.title}
                      width={100}
                      height={150}
                      className='shrink-0 w-[100px] h-[150px]'
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div className='w-[100px] h-[150px] bg-slate-50 rounded-md flex items-center justify-center'>
                      <FaBook size={60} className='text-slate-200' />
                    </div>
                  )}
                </Link>
              </td>
              <td>
                <Link href={`/new-books/${book.id}`} className=''>
                  {book.title}
                </Link>
              </td>
              <td className='hidden lg:table-cell' align='center'>
                {book.publisher}
              </td>
              <td className='hidden lg:table-cell' align='center'>
                {book.author}
              </td>
              <td align='center'>{book.translator}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='sm:hidden'>
        <thead></thead>
        <tbody>
          {new_books.map((book) => (
            <tr className='border-b last:border-b-0 py-1' key={book.id}>
              <Link
                href={`/new-books/${book.id}`}
                className='flex hover:bg-slate-50'>
                <td className='shrink-0 w-[100px] h-[150px]'>
                  {getImgUrl(book.thumbnail) ? (
                    <Image
                      src={getImgUrl(book.thumbnail)}
                      alt={book.title}
                      width={100}
                      height={150}
                    />
                  ) : (
                    <div className='w-[100px] h-[150px] bg-slate-50 rounded-md flex items-center justify-center shrink-0'>
                      <FaBook size={60} className='text-slate-200' />
                    </div>
                  )}
                </td>
                <td className='flex flex-col pt-1 px-4'>
                  <Link
                    href={`/new-books/${book.id}`}
                    className='text-sm xs:text-md'>
                    {book.title}
                  </Link>
                  <div className=' font-thin text-sm font-slate-300'>
                    <p className=''>{book.publisher}</p>
                    <p className=''>{book.author}</p>
                    <p>{book.translator}</p>
                  </div>
                </td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>

      <NewBooksPagination total_pages={total_pages} />
    </section>
  );
}
