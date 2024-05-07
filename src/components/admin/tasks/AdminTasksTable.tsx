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
    <section className='py-10 flex flex-col w-full gap-3'>
      <h2 className='text-lg font-semibold pb-8'>관리자 수주 게시판</h2>
      <div className='w-full flex justify-end'>
        <Link href='/admin/tasks/write' className='btn btn-neutral'>
          글쓰기
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, width: 100 }} align='center'>
                번호
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}>
                제목
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700, width: 80 }}>
                지원자
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700, width: 150 }}>
                링크
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700, width: 100 }}>
                언어
              </TableCell>

              <TableCell align='center' sx={{ fontWeight: 700, width: 230 }}>
                상태
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.tasks?.map((task: TaskType, index: number) => (
              <TableRow
                key={`${index}-rows`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' align='center'>
                  {task.id}
                </TableCell>
                <TableCell align='left'>
                  <Link
                    className='link link-neutral hover:font-semibold '
                    href={`/admin/tasks/${task.id}`}>
                    {task.title}
                  </Link>
                </TableCell>
                <TableCell align='center'>
                  <span
                    className={`${
                      task?.count_comments === 0 && 'text-slate-300'
                    }`}>
                    {task?.count_comments}
                  </span>
                </TableCell>
                <TableCell align='center'>
                  {task.link && (
                    <Link
                      href={formatLink(task.link)}
                      target='_blank'
                      className='btn btn-sm'>
                      도서정보
                    </Link>
                  )}
                </TableCell>
                <TableCell align='center'>
                  <LanguageBadge language={task.language} />
                </TableCell>

                <TableCell align='center'>
                  <StatusBadge status={task.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AdminTasksPagination count={data?.total_pages ?? 1} />
    </section>
  );
}
