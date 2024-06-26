'use client';

import { CommentType } from '@/components/admin/tasks/AdminComments';
import MemberComments from '@/components/member/tasks/MemberComments';
import BASE_URL from '@/utils/BASE_URL';
import formatDate from '@/utils/formatDate';
import formatDateTime from '@/utils/formatDateTime';
import { formatLink } from '@/utils/formatLink';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

type Props = {
  params: {
    task_id: any;
  };
};

type TaskDetail = {
  id: number;
  title: string;
  string: string;
  author: string;
  created_at: string;
  updated_at: string;
  content: string;
  link: string;
  link2: string;
  link3: string;

  comments: CommentType[];
  status: 'open' | 'testing' | 'closed' | 'completed';
  comment_start_time: string;
};

export default function page({}) {
  const { task_id } = useParams();
  const { loginState } = useAuthStore();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['taskDetail', task_id, loginState?.token ?? ''],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/tasks/${task_id}/`, {
          headers: {
            Authorization: loginState?.token,
          },
        })
        .then((res) => {
          return res.data as TaskDetail;
        }),
    staleTime: 0,
  });

  return (
    <div className='flex flex-col py-10'>
      <div className='self-end'>
        <Link href='/member/tasks' className='btn'>
          목록
        </Link>
      </div>
      <div className='flex justify-between items-center px-4 py-2'>
        <h2 className='text-semibold text-2xl'>{data?.title}</h2>{' '}
        <p>{formatDate(data?.created_at)}</p>
      </div>
      <div className='p-2 font-thin text-sm'>
        신청 가능 시각{' '}
        <span className='bg-orange-50 text-orange-600 rounded-md px-2 py-1 text-md font-normal'>
          {formatDateTime(data?.comment_start_time)}
        </span>
      </div>
      <div className='flex gap-2 py-1 '>
        {data?.link && (
          <Link
            target='_blank'
            className='btn btn-sm'
            href={formatLink(data?.link)}>
            도서 정보1
          </Link>
        )}
        {data?.link2 && (
          <Link
            target='_blank'
            className='btn btn-sm'
            href={formatLink(data?.link2)}>
            도서 정보2
          </Link>
        )}
        {data?.link3 && (
          <Link
            target='_blank'
            className='btn btn-sm'
            href={formatLink(data?.link3)}>
            도서 정보3
          </Link>
        )}
      </div>
      <div
        className='bg-stone-50 rounded-md shadow-md px-2 lg:px-8 py-10 font-thin whitespace-pre-wrap'
        dangerouslySetInnerHTML={{ __html: data?.content || '' }}></div>
      <MemberComments
        comments={data?.comments}
        status={data?.status}
        comment_start_time={data?.comment_start_time}
      />
      <Link href='/member/tasks' className='btn'>
        목록
      </Link>
    </div>
  );
}
