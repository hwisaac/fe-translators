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
    queryKey: ['my-tasks', token],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/me/my-tasks/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data as TaskType[]),
  });

  if (!isClient) return null;
  return (
    <section className='py-10 flex flex-col w-full'>
      <h2 className='text-lg font-semibold pb-8 px-2'>나의 수주 현황</h2>
      {/* <MuiTable data={data} /> */}
      <table className='table'>
        <thead>
          <tr>
            <th className='hidden lg:block'>번호</th>
            <th>도서제목</th>
            <th>링크</th>
            <th>언어</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((task: any, index: number) => {
            return (
              <tr key={`${index}-rows`}>
                <td className='hidden lg:block'>{task.id}</td>
                <td>
                  <Link href={`/member/tasks/${task.id}`} className='link'>
                    {task.title}
                  </Link>
                </td>

                <td>
                  {task?.link && (
                    <Link
                      href={task.link}
                      target='_blank'
                      className='btn btn-sm'>
                      도서정보
                    </Link>
                  )}
                </td>
                <td>
                  <LanguageBadge language={task.language} />
                </td>
                <td className='flex items-center justify-center'>
                  <EvaluatedStatus task={task} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
    const commentStatus = comments[0].status;

    switch (commentStatus) {
      case 'assigned_translator':
        return '담당번역가';
      case 'sample_translator':
        return '샘플번역가';
      case 'assigned_to_other':
        return '타번역가에 샘플 할당';
      case 'completed':
        return '마감';
    }
    switch (taskStatus) {
      case 'closed':
        return '종료';
      case 'completed':
        return '마감 - 타번역가에 번역 할당';
      case 'testing':
        return '타번역가에 샘플 할당';
    }
    return taskStatus;
    // taskStatus !== 'open'
  };
  if (evalStatus(task) === '지원 가능') {
    return (
      <div className='border px-2 bg-blue-50 border-blue-700 text-blue-700 flex justify-center items-center'>
        {evalStatus(task)}
      </div>
    );
  } else if (evalStatus(task) === '지원중')
    return (
      <div className='border px-2 bg-green-50 border-green-700 text-green-700 flex justify-center items-center'>
        {evalStatus(task)}
      </div>
    );
  else if (evalStatus(task) === '샘플번역가') {
    return (
      <div className='border px-2 bg-orange-50 border-orange-700 text-orange-700 flex justify-center items-center'>
        {evalStatus(task)}
      </div>
    );
  } else if (evalStatus(task) === '담당번역가') {
    return (
      <div className='px-2 bg-orange-700 text-white flex justify-center items-center'>
        {evalStatus(task)}
      </div>
    );
  }
  return evalStatus(task);
}