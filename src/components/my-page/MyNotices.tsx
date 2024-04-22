'use client';

import useToken from '@/app/hooks/useToken';
import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export type NoticeType = {
  title: string;
  id: number;
  created_at: string;
};

type Props = {};

export default function MyNotices({}: Props) {
  const [isClient, setIsClient] = useState(false);
  const token = useToken();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: notices } = useQuery({
    queryKey: ['my-notices'],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/notices?page=1&page_size=5&/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data.notices as NoticeType[]),
  });

  console.log(notices);

  return (
    <section className='py-10 flex flex-col w-full'>
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
            {notices?.map((notice, index) => (
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
    </section>
  );
}
