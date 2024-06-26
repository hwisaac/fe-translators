'use client';
import BASE_URL from '@/utils/BASE_URL';
import formatDate from '@/utils/formatDate';
import getImgUrl from '@/utils/getImgUrl';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Props = {};

type NoticeData = {
  notice: {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    file: any[];
  };
  previous: {
    id: number;
    title: string;
    created_at: string;
  };
  next: {
    id: number;
    title: string;
    created_at: string;
  };
};

export default function page({}: Props) {
  const { notice_id } = useParams();

  const { data } = useQuery({
    queryKey: ['notice_detail', notice_id],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/notices/${notice_id}/`)
        .then((res) => res.data as NoticeData),
  });

  return (
    <div className='flex flex-col py-10'>
      <div className='self-end space-x-2'>
        <Link href='/member/notice' className='btn'>
          목록
        </Link>
        <Link
          href={getImgUrl(data?.notice.file)}
          target='_blank'
          className={`btn btn-neutral ${!data?.notice.file && 'hidden'}`}>
          파일 다운로드
        </Link>
      </div>

      <div className='flex justify-between items-center px-4 py-2 mb-10'>
        <h2 className='text-semibold text-2xl'>{data?.notice.title}</h2>{' '}
        <p>{formatDate(data?.notice?.created_at)}</p>
      </div>

      <div
        className='bg-stone-50 rounded-md shadow-md px-2 lg:px-8 py-10 font-thin  whitespace-pre-wrap'
        dangerouslySetInnerHTML={{ __html: data?.notice?.content ?? '' }}></div>
      <div className='flex my-10 '>
        {/* <Link href='/member/notice'>
          <div className='bg-slate-300 text-2xl flex justify-center items-center h-[100px] w-[120px]'>
            목록
          </div>
        </Link> */}
        <div className='flex flex-col h-[100px] w-full'>
          <div className='h-1/2 flex gap-10 items-center px-10 border-b border-dotted'>
            <p className='font-thin'>다음글</p>
            {data?.next && (
              <Link
                href={`/member/notice/${data?.next.id}`}
                className='text-slate-600 hover:text-blue-400 transition-colors'>
                {data?.next.title}
              </Link>
            )}
          </div>
          <div className='h-1/2 flex gap-10 items-center px-10'>
            <p className='font-thin'>이전글</p>
            {data?.previous && (
              <Link
                href={`/member/notice/${data?.previous?.id}`}
                className='text-slate-600 hover:text-blue-400 transition-colors'>
                {data?.previous.title}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
