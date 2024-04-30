'use client';
import * as React from 'react';
import { FaFile } from 'react-icons/fa';
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
import AdminNoticesPagination from '@/components/admin/notice/AdminNoticesPagination';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import useToken from '@/app/hooks/useToken';
import { toast } from 'react-toastify';
import { useParams, useSearchParams } from 'next/navigation';
type Props = {};

export default function AdminNoticeTable({}) {
  const token = useToken();
  const searchParams = useSearchParams();

  const { data }: any = useQuery({
    queryKey: ['adminNoticesList', searchParams.toString()],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/notices/admin?${searchParams.toString()}&/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          toast.error(error.message);
        }),
  });
  React.useEffect(() => {
    console.log(searchParams.toString());
  }, [searchParams.toString()]);
  return (
    <section className='py-10 flex flex-col w-full gap-3'>
      <h2 className='text-lg font-semibold pb-8'>공지사항(관리자용)</h2>
      <div className='w-full flex justify-end'>
        <Link href='/admin/notice/write' className='btn btn-neutral'>
          글쓰기
        </Link>
      </div>
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
                작성일
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.notices?.map((notice: NoticeType, index: number) => (
              <TableRow
                key={`${index}-rows`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' align='center'>
                  {notice.id}
                </TableCell>
                <TableCell align='left'>
                  <Link
                    className='link link-neutral hover:font-semibold flex items-center gap-2 group'
                    href={`/admin/notice/${notice.id}`}>
                    {notice?.title}{' '}
                    {notice?.file && (
                      <FaFile className='inline text-slate-400 group-hover:text-slate-700' />
                    )}
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
      <AdminNoticesPagination count={data?.total_pages} />
    </section>
  );
}
