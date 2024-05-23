'use client';
import * as React from 'react';
import Link from 'next/link';
import BASE_URL from '@/utils/BASE_URL';
import TasksPagination from '@/components/member/tasks/MemberTasksPagination';
import SearchForm from '@/components/member/tasks/SearchForm';
import LanguageBadge from '@/components/member/tasks/LanguageBadge';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useToken from '@/app/hooks/useToken';
type Props = {
  searchParams: {
    page: string;
    query: string;
    language: string;
    status: string;
  };
};
export type TaskType = {
  id: number;
  status: 'open' | 'testing' | 'closed' | 'completed';
  title: string;
  language: 'en' | 'jp';
  count_comments: number;
  link: string;
};

export default function TasksPage({
  searchParams: { page, query, language, status },
}: Props) {
  const token = useToken();

  const { data } = useQuery({
    queryKey: ['tasks_list', page, query, language, status],
    queryFn: () =>
      axios
        .get(
          `${BASE_URL}/tasks?page=${page ?? ''}&language=${
            language ?? ''
          }&query=${query ?? ''}&status=${status ?? ''}&/`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => res.data),
  });
  React.useEffect(() => {
    console.log(data);
    console.log(page, query, language, status);
  }, [data, page, query, language, status]);
  return (
    <div className='flex flex-col items-center py-10'>
      <SearchForm />
      <TasksTable data={data} />
    </div>
  );
}

function TasksTable({ data }: { data?: any }) {
  return (
    <section className='py-10 flex flex-col w-full gap-3 px-2'>
      <h2 className='text-lg font-semibold pb-8'>번역가 수주 게시판</h2>
      <table className='table table-xs lg:table-md'>
        <thead>
          <tr>
            <th className='hidden lg:flex'>번호</th>
            <th>제목</th>
            <th className='hidden lg:flex'>링크</th>
            <th className='w-[100px]'>언어</th>
            <th className=''>상태</th>
          </tr>
        </thead>
        <tbody>
          {data?.tasks?.map((task: TaskType, index: number) => (
            <tr key={`${index}-rows`}>
              <td className='hidden lg:flex'>{task.id}</td>
              <td>
                <Link
                  className='link link-neutral hover:font-semibold '
                  href={`/member/tasks/${task.id}`}>
                  {`${task.title}`}
                </Link>
              </td>
              <td className='hidden lg:flex'>
                {task.link && (
                  <Link
                    href={task.link}
                    target='_blank'
                    className='btn btn-sm hidden lg:flex'>
                    도서정보
                  </Link>
                )}
              </td>
              <td>
                <LanguageBadge language={task.language} />
              </td>

              <td>
                <StatusBadge status={task.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TasksPagination count={data?.total_pages ?? 1} />
    </section>
  );
}

function StatusBadge({
  status,
}: {
  status: 'open' | 'closed' | 'testing' | 'completed';
}) {
  switch (status) {
    case 'open':
      return (
        <div className='border rounded-md font-semibold text-green-700 border-green-700 bg-green-50 flex-1 w-full py-1 flex justify-center items-center'>
          모집 중
        </div>
      );
    case 'testing':
      return (
        <div className='border rounded-md font-semibold text-orange-500 border-orange-500 bg-orange-50 flex-1 w-full py-1 flex justify-center items-center'>
          모집 중단 - 샘플심사중
        </div>
      );
    case 'completed':
      return (
        <div className='border rounded-md font-semibold text-stone-400 border-stone-400 bg-stone-50 flex-1 w-full py-1 flex justify-center items-center'>
          마감 - 번역가 선정완료
        </div>
      );
    case 'closed':
      return (
        <div className='border rounded-md font-semibold text-stone-400 border-stone-400 bg-stone-50 flex-1 w-full py-1 flex justify-center items-center'>
          마감 - 작업중단
        </div>
      );
  }
  return <span>{status}</span>;
}
