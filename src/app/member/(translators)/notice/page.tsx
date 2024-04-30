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

import NoticesPagination from '@/components/my-page/notices/MemberNoticesPagination';
import MemberNoticeSearchForm from '@/components/member/notice/MemberNoticeSearchForm';

type Props = {
  searchParams: {
    page: string;
    query: string;
    option: string;
  };
};

export default async function MemberNoticePage({
  searchParams: { page, query, option },
}: Props) {
  const data = await fetch(
    `${BASE_URL}/notices?page=${page || ''}&query=${query || ''}&option=${
      option || ''
    }&/`,
    {
      cache: 'no-cache',
    }
  ).then((res) => res.json());

  return (
    <div className='flex flex-col items-center py-10'>
      <MemberNoticeSearchForm />
      <MemberNoticeTable data={data} />
    </div>
  );
}

async function MemberNoticeTable({ data }: any) {
  return (
    <section className='py-10 flex flex-col w-full gap-3'>
      <h2 className='text-lg font-semibold pb-8'>번역가 공지사항</h2>
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
              <TableCell align='center' sx={{ fontWeight: 700, width: 150 }}>
                작성일
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.notices?.map((notice: NoticeType, index: number) => (
              <TableRow
                key={`${index}-rows`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' align='center'>
                  {notice.id}
                </TableCell>
                <TableCell align='left'>
                  <Link
                    className='link link-neutral hover:font-semibold'
                    href={`/member/notice/${notice.id}`}>
                    {notice.title}
                  </Link>
                </TableCell>
                <TableCell align='center'>
                  {formatDate(notice.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoticesPagination count={data.total_pages} />
    </section>
  );
}
