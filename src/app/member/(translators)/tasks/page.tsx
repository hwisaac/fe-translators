import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import formatDate from '@/utils/formatDate';
import BASE_URL from '@/utils/BASE_URL';
import { NoticeType } from '@/components/my-page/MyNotices';
import TasksPagination from '@/components/member/tasks/MemberTasksPagination';
import SearchForm from '@/components/member/tasks/SearchForm';
import LanguageBadge from '@/components/member/tasks/LanguageBadge';
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

export default async function TasksPage({
  searchParams: { page, query, language, status },
}: Props) {
  // console.log(query, page, filter);

  const data = await fetch(
    `${BASE_URL}/tasks?page=${page ?? ''}&language=${language ?? ''}&query=${
      query ?? ''
    }&status=${status ?? ''}&/`
  ).then((data) => data.json());
  return (
    <div className='flex flex-col items-center py-10'>
      <SearchForm />
      <TasksTable data={data} />
    </div>
  );
}

async function TasksTable({ data }: { data: any }) {
  return (
    <section className='py-10 flex flex-col w-full gap-3'>
      <h2 className='text-lg font-semibold pb-8'>번역가 수주 게시판</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, width: 150 }} align='center'>
                번호
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}>
                제목
              </TableCell>

              <TableCell align='center' sx={{ fontWeight: 700, width: 150 }}>
                링크
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700, width: 150 }}>
                언어
              </TableCell>

              <TableCell align='center' sx={{ fontWeight: 700, width: 230 }}>
                상태
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.tasks?.map((task: TaskType, index: number) => (
              <TableRow
                key={`${index}-rows`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' align='center'>
                  {task.id}
                </TableCell>
                <TableCell align='left'>
                  <Link
                    className='link link-neutral hover:font-semibold '
                    href={`/member/tasks/${task.id}`}>
                    {`${task.title}`}
                  </Link>
                </TableCell>
                <TableCell align='center'>
                  {task.link && (
                    <Link
                      href={task.link}
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
      <TasksPagination count={data.total_pages} />
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
        <div className='border rounded-md font-semibold text-green-700 border-green-700 bg-green-50 flex-1 w-full py-1'>
          모집 중
        </div>
      );
    case 'testing':
      return (
        <div className='border rounded-md font-semibold text-orange-500 border-orange-500 bg-orange-50 flex-1 w-full py-1'>
          모집 중단 - 샘플심사중
        </div>
      );
    case 'completed':
      return (
        <div className='border rounded-md font-semibold text-stone-400 border-stone-400 bg-stone-50 flex-1 w-full py-1'>
          마감 - 번역가 선정완료
        </div>
      );
    case 'closed':
      return (
        <div className='border rounded-md font-semibold text-stone-400 border-stone-400 bg-stone-50 flex-1 w-full py-1'>
          마감 - 작업중단
        </div>
      );
  }
  return <span>{status}</span>;
}
