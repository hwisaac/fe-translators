import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

import LanguageBadge from '@/components/member/tasks/LanguageBadge';
import AdminTasksPagination from '@/components/admin/tasks/AdminTasksPagination';
import StatusBadge from '@/components/StatusBadge';
import { formatLink } from '@/utils/formatLink';
type TaskType = {
  id: number;
  status: 'open' | 'testing' | 'closed' | 'completed';
  title: string;
  language: 'en' | 'jp';
  count_comments: number;
  link: string;
};

export default function AdminTasksTable({ data }: any) {
  return (
    <section className='py-10 flex flex-col w-full gap-3 items-center'>
      <h2 className='hidden sm:block text-lg font-semibold pb-8 self-start'>
        관리자 수주 게시판
      </h2>
      <div className='w-full flex justify-end'>
        <Link href='/admin/tasks/write' className='btn btn-neutral'>
          글쓰기
        </Link>
      </div>
      <table className='hidden sm:table'>
        <thead>
          <tr>
            <th className='hidden lg:table-cell w-[40px]' align='center'>
              번호
            </th>
            <th>제목</th>
            <th align='center' className='w-[40px]'>
              지원자
            </th>
            <th align='center' className='w-[100px]'>
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
              <td className='hidden lg:table-cell font-thin' align='center'>
                {task.id}
              </td>
              <td>
                <Link
                  className='hover:text-blue-400 sm:text-lg font-thin'
                  href={`/admin/tasks/${task.id}`}>
                  {task.title}
                </Link>
              </td>
              <td align='center'>
                <span
                  className={`${
                    task?.count_comments === 0 && 'text-slate-300'
                  }`}>
                  {task?.count_comments}
                </span>
              </td>
              <td align='center'>
                {task.link && (
                  <Link
                    href={formatLink(task.link)}
                    target='_blank'
                    className='btn btn-xs text-nowrap'>
                    도서정보
                  </Link>
                )}
              </td>
              <td align='center'>
                <LanguageBadge language={task.language} />
              </td>

              <td align='center' className='flex'>
                <StatusBadge status={task.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                    지원자
                  </p>
                  <span
                    className={`${
                      task?.count_comments === 0 && 'text-slate-300'
                    }`}>
                    {task?.count_comments}
                  </span>
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

      <AdminTasksPagination count={data?.total_pages ?? 1} />
    </section>
  );
}
