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
import { useSearchParams } from 'next/navigation';
import StatusBadge from '@/components/StatusBadge';
import { evalStatus } from '@/utils/commons';
type Props = {};
export type TaskType = {
  id: number;
  status: 'open' | 'testing' | 'closed' | 'completed';
  title: string;
  language: 'en' | 'jp';
  count_comments: number;
  link: string;
};

export default function TasksPage({}: Props) {
  const token = useToken();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const query = searchParams.get('query');
  const status = searchParams.get('status');
  const language = searchParams.get('language');

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

  return (
    <div className='flex flex-col items-center'>
      <SearchForm />
      <TasksTable data={data} />
    </div>
  );
}

function TasksTable({ data }: { data?: any }) {
  return (
    <section className='py-10 flex flex-col w-full gap-3 px-2 items-center'>
      <h2 className='hidden sm:block text-lg font-semibold pb-8 self-start'>
        번역가 수주 게시판
      </h2>
      <table className='hidden sm:table lg:table-md w-full'>
        <thead>
          <tr>
            <th className='hidden lg:table-cell w-[40px]' align='center'>
              번호
            </th>
            <th>제목</th>
            <th className='hidden lg:table-cell w-[100px]' align='center'>
              링크
            </th>
            <th className='w-[100px]' align='center'>
              언어
            </th>
            <th className='w-[155px]' align='center'>
              상태
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.tasks?.map((task: TaskType, index: number) => (
            <tr key={`${index}-rows`}>
              <td className='hidden lg:table-cell font-thin'>{task.id}</td>
              <td>
                <Link
                  className='hover:text-blue-400 sm:text-lg font-thin'
                  href={`/member/tasks/${task.id}`}>
                  {`${task.title}`}
                </Link>
              </td>
              <td className='hidden lg:table-cell'>
                {task.link && (
                  <Link href={task.link} target='_blank' className='btn btn-sm'>
                    도서정보
                  </Link>
                )}
              </td>
              <td className='' align='center'>
                <LanguageBadge language={task.language} />
              </td>

              <td className='flex'>
                <StatusBadge status={task.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 반응형 테이블 */}
      <table className='sm:hidden w-full'>
        <thead></thead>
        <tbody>
          {data?.tasks?.map((task: TaskType, index: number) => (
            <tr key={`${index}-rows`}>
              <td className='flex flex-col border-b first:border-t gap-1 py-3 px-2 hover:bg-gray-50'>
                <div>
                  <Link
                    className='hover:text-blue-800 transition-colors'
                    href={`/member/tasks/${task.id}`}>
                    {`${task.title}`}
                  </Link>
                </div>
                <div className='flex items-center'>
                  <p className='text-blue-400 w-[90px] shrink-0 text-sm py-1'>
                    도서정보
                  </p>
                  {task.link && (
                    <Link
                      href={task.link}
                      target='_blank'
                      className='btn btn-sm hidden lg:flex'>
                      링크
                    </Link>
                  )}
                </div>
                <div className='flex items-center'>
                  <p className='text-blue-400 w-[90px] shrink-0 text-sm py-1'>
                    언어
                  </p>
                  <span
                    className={`text-sm font-semibold ${
                      task.language === 'en'
                        ? 'text-blue-600'
                        : 'text-orange-600'
                    }`}>
                    {task.language === 'en' ? '영어' : '일본어'}
                  </span>
                </div>

                <div className='flex items-center'>
                  <p className='text-blue-400 w-[90px] shrink-0 text-sm py-1'>
                    상태
                  </p>
                  <StatusBadge status={task.status} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TasksPagination count={data?.total_pages ?? 1} />
    </section>
  );
}

