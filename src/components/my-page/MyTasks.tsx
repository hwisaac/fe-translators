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
import LanguageBadge from '@/components/member/tasks/LanguageBadge';

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

type Props = {};

export type TaskType = {
  author: string;
  comments: {
    created_at: string;
    updated_at: string;
    author: string;
    content: string;
    status: string;
    replies: string;
  }[];
  content: string;
  created_at: string;
  id: number;
  language: 'en' | 'jp';
  link: string;
  status: 'open' | 'testing' | 'closed' | 'completed';
  title: string;
  updated_at: string;
};

export default function MyTasks({}: Props) {
  const [isClient, setIsClient] = useState(false);
  const token = useToken();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data } = useQuery({
    queryKey: ['my-available-tasks', token],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/me/available-tasks/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data as TaskType[]),
  });

  if (!isClient) return null;
  return (
    <section className='py-10 flex flex-col w-full'>
      <h2 className='text-lg font-semibold pb-8'>나의 수주 현황</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, width: 150 }}>번호</TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}>
                도서제목
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
            {data?.map((task, index) => (
              <TableRow
                key={`${index}-rows`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {task.id}
                </TableCell>
                <TableCell align='left'>
                  <Link href={`/member/tasks/${task.id}`} className='link'>
                    {task.title}
                  </Link>
                </TableCell>

                <TableCell align='center'>
                  {task?.link && (
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
                  <EvaluatedStatus task={task} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

function EvaluatedStatus({ task }: { task: TaskType }) {
  const evalStatus = (task: TaskType): string => {
    const taskStatus = task.status;
    const comments = task.comments;
    if (taskStatus === 'open' && comments.length === 0) {
      return '지원 가능';
    } else if (taskStatus === 'open' && comments.length !== 0) {
      return '지원중';
    }
    // taskStatus !== 'open'

    switch (taskStatus) {
      case 'testing':
        return '지원불가(샘플심사)';
      case 'closed':
        return '지원불가(마감)';
      case 'closed':
        return '지원불가(번역가선정)';
      default:
        return '버그(개발자문의)';
    }
  };
  if (evalStatus(task) === '지원 가능') {
    return (
      <div className='border bg-blue-50 border-blue-700 text-blue-700 flex justify-center items-center'>
        {evalStatus(task)}
      </div>
    );
  } else if (evalStatus(task) === '지원중')
    return (
      <div className='border bg-green-50 border-green-700 text-green-700 flex justify-center items-center'>
        {evalStatus(task)}
      </div>
    );
  return null;
}