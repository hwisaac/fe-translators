'use client';
import BASE_URL from '@/utils/BASE_URL';
import formatDate from '@/utils/formatDate';
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

export function formatTextField(text?: string | null): any {
  if (!text) return <p></p>;
  return text
    .split('\n')
    .map((line: string, index: number) => <p key={index}>{line}</p>);
}

export default function page({}: Props) {
  const { notice_id } = useParams();

  const { data } = useQuery({
    queryKey: ['notice_detail', notice_id],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/notices/${notice_id}/`)
        .then((res) => res.data as NoticeData),
  });
  console.log(data);
  return (
    <div className='flex flex-col py-10'>
      <div className='flex justify-between items-center border-b border-b-slate-700 px-4 py-2 mb-10'>
        <h2 className='text-semibold text-2xl'>{data?.notice.title}</h2>{' '}
        <p>{formatDate(data?.notice?.created_at)}</p>
      </div>
      <div className='border-b border-b-slate-700 py-10'>
        {formatTextField(data?.notice?.content)}
      </div>
      <div className='flex my-10 border'>
        <div className='border bg-slate-300 text-2xl flex justify-center items-center h-[100px] w-[120px]'>
          목록
        </div>
        <div className='flex flex-col h-[100px] w-full'>
          <div className='h-1/2 flex gap-10 items-center px-10'>
            <p className='font-semibold'>이전글</p>
            <Link
              href={`/member/notice/${data?.previous.id}`}
              className='text-slate-600'>
              {data?.previous.title}
            </Link>
          </div>
          <div className='h-1/2 flex gap-10 items-center px-10 border-t'>
            <p className='font-semibold'>다음글</p>
            <Link
              href={`/member/notice/${data?.next.id}`}
              className='text-slate-600'>
              {data?.next.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
