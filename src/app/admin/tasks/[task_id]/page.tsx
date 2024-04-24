import useToken from '@/app/hooks/useToken';
import StatusBadge from '@/components/StatusBadge';
import Comments, {
  CommentType,
} from '@/components/member/tasks/MemberComments';
import LanguageBadge from '@/components/member/tasks/LanguageBadge';
import BASE_URL from '@/utils/BASE_URL';
import formatDate from '@/utils/formatDate';
import formatDateTime from '@/utils/formatDateTime';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

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
};

export function formatTextField(text?: string | null): any {
  if (!text) return <p></p>;
  return text
    .split('\n')
    .map((line: string, index: number) => <p key={index}>{line}</p>);
}

export default async function page({ params: { task_id } }: Props) {
  // const { task_id } = useParams();
  const data: TaskDetail = await fetch(`${BASE_URL}/tasks/${task_id}/`, {
    next: {
      tags: [`taskDetail_${task_id}`],
    },
  }).then((res) => res.json());
  return (
    <div className='flex flex-col py-10'>
      <div className='flex justify-between items-center border-b border-b-slate-700 px-4 py-2'>
        <h2 className='text-semibold text-2xl flex items-center gap-3'>
          {data?.title} <LanguageBadge language={data?.language} />
        </h2>
        <p className='text-slate-500'>{formatDateTime(data?.created_at)}</p>
      </div>
      <div className='flex gap-3 px-3 py-3'>
        <StatusBadge status={data?.status} />
        {data?.link && (
          <Link href={data.link} className='btn btn-sm'>
            도서 정보
          </Link>
        )}
        <Link href={`/admin/tasks/${task_id}/edit`} className='btn btn-sm'>
          수정하기
        </Link>
      </div>
      <div className='border-b border-b-slate-700 py-10'>
        {formatTextField(data?.content)}
      </div>
      <Comments comments={data?.comments} />
      <Link href='/admin/tasks' className='btn'>
        목록
      </Link>
    </div>
  );
}
