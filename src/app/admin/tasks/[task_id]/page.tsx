'use client';
import useToken from '@/app/hooks/useToken';
import StatusBadge from '@/components/StatusBadge';

import LanguageBadge from '@/components/member/tasks/LanguageBadge';
import BASE_URL from '@/utils/BASE_URL';
import formatDate from '@/utils/formatDate';
import formatDateTime from '@/utils/formatDateTime';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AdminComments, {
  CommentType,
} from '@/components/admin/tasks/AdminComments';
import { formatLink } from '@/utils/formatLink';
import { toast } from 'react-toastify';

type Props = {
  params: {
    task_id: any;
  };
};

export type TaskDetail = {
  id: number;
  title: string;
  string: string;
  author: string;
  created_at: string;
  updated_at: string;
  content: string;
  comments: CommentType[];
  language: 'jp' | 'en';
  link: string;
  status: 'closed' | 'completed' | 'open' | 'testing';
  comment_start_time: string;
};

export function formatTextField(text?: string | null): any {
  if (!text) return <p></p>;
  return text
    .split('\n')
    .map((line: string, index: number) => <p key={index}>{line}</p>);
}

export default function page({}: Props) {
  const { task_id } = useParams();
  const token = useToken();

  const { data } = useQuery({
    queryKey: ['adminTaskDetail', task_id],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/tasks/admin/${task_id}/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data as TaskDetail)
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            toast.error('권한이 없습니다.');
          }
        }),
    staleTime: 1000 * 60,
  });

  return (
    <div className='flex flex-col py-10'>
      <div className='self-end space-x-2'>
        <Link href='/admin/tasks' className='btn'>
          목록
        </Link>
        <Link href={`/admin/tasks/${task_id}/edit`} className='btn'>
          수정하기
        </Link>
        <Link href='/admin/tasks/write' className='btn btn-neutral'>
          글쓰기
        </Link>
      </div>
      <div className='flex justify-between items-center border-b border-b-slate-700 px-4 py-2'>
        <h2 className='text-semibold text-2xl flex items-center gap-3'>
          {data?.title} <LanguageBadge language={data?.language} />
        </h2>
        <p className='text-slate-500'>
          생성: {formatDateTime(data?.created_at)}
        </p>
      </div>
      <div className='flex gap-3 px-3 py-3 items-center'>
        <StatusBadge status={data?.status} />
        {data?.link && (
          <Link
            href={formatLink(data.link)}
            target='_blank'
            className='btn btn-sm'>
            도서 정보
          </Link>
        )}

        <span className='text-orange-700 rounded-md bg-orange-50 px-2 py-1'>
          [댓글] {formatDateTime(data?.comment_start_time)}
        </span>
      </div>
      <div className='border-b border-b-slate-700 py-10'>
        {formatTextField(data?.content)}
      </div>
      <AdminComments comments={data?.comments} />
      <Link href='/admin/tasks' className='btn'>
        목록
      </Link>
    </div>
  );
}
