'use client';
import useToken from '@/app/hooks/useToken';
import BASE_URL from '@/utils/BASE_URL';
import formatDate from '@/utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

type Props = {};

type NoticeData = {
  notice: {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    file: string;
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
export const FILE_URL = 'http://127.0.0.1:8000';
function formatTextField(text?: string | null): any {
  if (!text) return <p></p>;
  return text
    .split('\n')
    .map((line: string, index: number) => <p key={index}>{line}</p>);
}

export default function page({}) {
  // const data = await fetch(`${BASE_URL}/notices/${notice_id}/`, {
  //   cache: 'no-cache',
  // }).then((res) => res.json());
  const { notice_id } = useParams();
  const token = useToken();
  const { data } = useQuery({
    queryKey: ['adminNotice', notice_id],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/notices/admin/${notice_id}/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data)
        .catch((err) => toast.error(err.message)),
  });

  return (
    <div className='flex flex-col py-10'>
      <Link href='/admin/notice/write' className='btn btn-neutral self-end'>
        공지사항 등록
      </Link>
      <div className='flex justify-between items-center border-b border-b-slate-700 px-4 py-2 mb-3'>
        <h2 className='text-semibold text-2xl'>{data?.notice?.title}</h2>{' '}
        <p>{formatDate(data?.notice?.created_at)}</p>
      </div>
      <div className={`flex items-center gap-3 border-b pb-3`}>
        <Link href={`/admin/notice/${notice_id}/edit`} className='btn btn-sm'>
          수정
        </Link>
        <div className='btn btn-sm'>삭제</div>
        <Link
          href={`${FILE_URL}${data?.notice?.file}`}
          target='_blank'
          className={`btn btn-sm btn-ghost ${!data?.notice?.file && 'hidden'}`}>
          {data?.notice?.file?.split('/')[3]}
        </Link>
      </div>
      <div className='border-b border-b-slate-700 py-10'>
        {formatTextField(data?.notice?.content)}
      </div>
      <div className='flex my-10 border'>
        <Link href='/admin/notice'>
          <div className='border bg-slate-300 text-2xl flex justify-center items-center h-[100px] w-[120px]'>
            목록
          </div>
        </Link>
        <div className='flex flex-col h-[100px] w-full'>
          <div className='h-1/2 flex gap-10 items-center px-10 border-t'>
            <p className='font-semibold'>다음글</p>
            {data?.next && (
              <Link
                href={`/admin/notice/${data?.next?.id}`}
                className='text-slate-600 link'>
                {data?.next.title}
              </Link>
            )}
          </div>
          <div className='h-1/2 flex gap-10 items-center px-10'>
            <p className='font-semibold'>이전글</p>
            {data?.previous && (
              <Link
                href={`/admin/notice/${data?.previous?.id}`}
                className='text-slate-600 link'>
                {data?.previous.title}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
