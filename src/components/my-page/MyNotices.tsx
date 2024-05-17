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
  file: string;
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
      <h2 className='text-lg font-semibold pb-8 px-2'>번역가 공지사항</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {notices?.map((notice, index) => (
            <tr key={`${index}-rows`}>
              <td>{notice.id}</td>
              <td>
                <Link
                  className='link link-neutral hover:font-semibold'
                  href={`/member/notice/${notice.id}`}>
                  {notice.title}
                </Link>
              </td>
              <td>{formatDate(notice.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
