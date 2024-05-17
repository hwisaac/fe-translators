import { FaPlusCircle } from 'react-icons/fa';
import bgPattern from '/public/home/bg-main-notice-pattern.png';
import BASE_URL from '@/utils/BASE_URL';
import getImgUrl from '@/utils/getImgUrl';
import Link from 'next/link';
import Image from 'next/image';
import { FaBook } from 'react-icons/fa';

type Props = {};

export type NewBookType = {
  id: number;
  thumbnail: string;
  title: string;
  publisher: string;
  author: string;
  translator: string;
};

export type GetNewBooksType = {
  page: number;
  total_pages: number;
  total_items: number;
  new_books: NewBookType[];
};

export default async function SectionTwo({}: Props) {
  const data: GetNewBooksType = await fetch(`${BASE_URL}/new-books/`, {
    cache: 'no-cache',
  }).then((res) => res.json());

  return (
    <section
      className='w-full pb-20'
      style={{
        backgroundImage: `url(${bgPattern})`,
      }}>
      <div className='w-full max-w-6xl mx-auto flex flex-col'>
        <div className='flex border-b items-end gap-8 py-4 my-10 relative px-2'>
          <h2 className='text-4xl text-slate-900'>신간 안내</h2>

          <span className='text-slate-500'>
            우리 번역가가 번역한 도서입니다.
          </span>
          <Link
            href={'/new-books'}
            className='absolute right-0 font-semibold text-sm flex items-center gap-3 cursor-pointer text-slate-700 px-2'>
            VIEW MORE
            <FaPlusCircle size={20} />
          </Link>
        </div>
        <div>
          <div className='carousel rounded-box max-w-6xl overflow-x-scroll'>
            {data.new_books.map((book) => (
              <div className='carousel-item mr-3 py-1'>
                <div className='card card-compact w-[250px] bg-slate-50 shadow h-[400px]'>
                  <figure className='w-full h-2/3 relative shrink-0 overflow-hidden'>
                    {book.thumbnail ? (
                      <Image
                        src={getImgUrl(book.thumbnail)}
                        alt={book.title}
                        width={200}
                        height={300}
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <FaBook size={90} className='text-slate-200' />
                    )}
                  </figure>
                  <div className='card-body'>
                    <h2 className='card-title text-sm text-blue-700 font-normal'>
                      번역가
                      <span className=''>{book.translator}</span>
                    </h2>
                    <p className='font-semibold '>{book.title}</p>

                    <div className='card-actions justify-end absolute right-3 bottom-3'>
                      <Link href={`/new-books/${book.id}`}>
                        <button className='btn btn-neutral btn-sm btn-outline'>
                          자세히
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
