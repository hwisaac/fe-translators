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
import { FaFile } from 'react-icons/fa';
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
      <h2 className='text-lg font-semibold pb-8 px-2'>번역가 공지사항</h2>
      <table className='table'>
        <thead>
          <tr>
            <th className='w-[50px]'>번호</th>
            <th>제목</th>
            <th className='w-[120px]'>작성일</th>
          </tr>
        </thead>

        <tbody>
          {data?.notices?.map((notice: NoticeType, index: number) => (
            <tr key={`${index}-tr`}>
              <td className='font-thin text-sm'>{notice.id}</td>
              <td>
                <Link
                  className='font-thin text-lg hover:text-blue-400 flex items-center gap-2 group'
                  href={`/member/notice/${notice.id}`}>
                  {notice.title}
                  {notice?.file && (
                    <FaFile
                      className='inline text-slate-400 group-hover:text-slate-700'
                      size={12}
                    />
                  )}
                </Link>
              </td>
              <td className='font-thin text-sm'>
                {formatDate(notice.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <NoticesPagination count={data.total_pages} />
    </section>
  );
}
