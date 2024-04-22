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

import NoticesPagination from '@/components/my-page/notices/NoticesPagination';

type Props = {
  searchParams: { page: number };
};

export default function NoticePage({ searchParams: { page } }: Props) {
  return (
    <div className='flex flex-col items-center py-10'>
      <SearchForm />

      <NoticeTable page={page ?? 1} />
    </div>
  );
}

function SearchForm() {
  return (
    <div className='join mx-auto'>
      <div>
        <div>
          <input
            className='input input-bordered join-item w-[400px]'
            placeholder='Search'
          />
        </div>
      </div>
      <select className='select select-bordered join-item'>
        <option>제목</option>
        <option>내용</option>
        <option>제목+내용</option>
      </select>
      <div className='indicator'>
        <button className='btn join-item'>검색</button>
      </div>
    </div>
  );
}

function SearchFilter() {
  return (
    <div className='flex gap-10'>
      <label className='label cursor-pointer space-x-2'>
        <input type='checkbox' className='checkbox' />
        <span className='label-text'>영어</span>
      </label>
      <label className='label cursor-pointer space-x-2'>
        <input type='checkbox' className='checkbox' />
        <span className='label-text'>일어</span>
      </label>
    </div>
  );
}

async function NoticeTable({ page }: { page: number | string }) {
  const data = await fetch(`${BASE_URL}/notices?page=${page}&/`, {
    cache: 'no-cache',
  }).then((data) => data.json());

  return (
    <section className='py-10 flex flex-col w-full gap-3'>
      <h2 className='text-lg font-semibold pb-8'>번역가 공지사항</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>번호</TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}>
                제목
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}>
                작성일
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.notices?.map((notice: NoticeType, index: number) => (
              <TableRow
                key={`${index}-rows`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {notice.id}
                </TableCell>
                <TableCell align='center'>
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
