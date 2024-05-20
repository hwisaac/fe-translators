'use client';
import useToken from '@/app/hooks/useToken';
import { CommentType } from '@/components/admin/tasks/AdminComments';
import MemberComments from '@/components/member/tasks/MemberComments';
import BASE_URL from '@/utils/BASE_URL';
import formatDate from '@/utils/formatDate';
import formatDateTime from '@/utils/formatDateTime';
import { formatLink } from '@/utils/formatLink';
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

function formatTextField(text?: string | null): any {
  if (!text) return <p></p>;
  return text
    .split('\n')
    .map((line: string, index: number) => <p key={index}>{line}</p>);
}

export default function page({}) {
  const { task_id } = useParams();
  const token = useToken();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['taskDetail', task_id],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/tasks/${task_id}/`, {
          headers: {
            Authorization: token, // member 는 토큰이 필요한 detail 페이지를 가짐
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
      <div className='flex justify-between items-center border-b border-b-slate-700 px-4 py-2'>
        <h2 className='text-semibold text-2xl'>{data?.title}</h2>{' '}
        <p>{formatDate(data?.created_at)}</p>
      </div>
      <div className='p-2'>
        신청 가능 시각:
        <span className='bg-orange-50 text-orange-600 rounded-md px-2 py-1'>
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
      <div className='border-b border-b-slate-700 py-10 px-4 whitespace-pre'>
        {formatTextField(data?.content)}
        {/* {data?.content} */}
      </div>
      <MemberComments
        comments={data?.comments}
        status={data?.status}
        comment_start_time={data?.comment_start_time}
      />
    </div>
  );
}
