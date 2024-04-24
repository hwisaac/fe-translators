'use client';
import useToken from '@/app/hooks/useToken';
import Comments, { CommentType } from '@/components/member/tasks/Comments';
import BASE_URL from '@/utils/BASE_URL';
import formatDate from '@/utils/formatDate';
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
  comments: CommentType[];
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
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['taskDetail', task_id],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/tasks/${task_id}/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          return res.data as TaskDetail;
        }),
  });
  return (
    <div className='flex flex-col py-10'>
      <div className='flex justify-between items-center border-b border-b-slate-700 px-4 py-2 mb-10'>
        <h2 className='text-semibold text-2xl'>{data?.title}</h2>{' '}
        <p>{formatDate(data?.created_at)}</p>
      </div>
      <div className='border-b border-b-slate-700 py-10'>
        {formatTextField(data?.content)}
      </div>
      <Comments comments={data?.comments} />
      <span onClick={() => router.push('/admin/tasks')} className='btn'>
        목록
      </span>
    </div>
  );
}
