'use client';

import useToken from '@/app/hooks/useToken';
import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
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
      <table className='hidden sm:table'>
        <thead>
          <tr>
            <th className='hidden lg:block text-center'>번호</th>
            <th>도서제목</th>
            <th>도서정보</th>
            <th className='text-center'>언어</th>
            <th className='text-center'>상태</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((task: any, index: number) => {
            return (
              <tr key={`${index}-rows`}>
                <td className='hidden lg:block'>{task.id}</td>
                <td>
                  <Link
                    href={`/member/tasks/${task.id}`}
                    className=' text-[16px] font-thin hover:font-normal'>
                    {task.title}
                  </Link>
                </td>

                <td>
                  {task?.link && (
                    <Link
                      href={task.link}
                      target='_blank'
                      className='btn btn-sm'>
                      <FaExternalLinkAlt />
                    </Link>
                  )}
                </td>
                <td className='flex justify-center'>
                  <LanguageBadge language={task.language} />
                </td>
                <td className=''>
                  <EvaluatedStatus task={task} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className='sm:hidden'>
        <thead></thead>
        <tbody>
          {data?.map((task: any, index: number) => {
            return (
              <tr key={`${index}-rows-sm`}>
                <td className='flex flex-col border-b gap-1 py-3 px-2 '>
                  <Link
                    href={`/member/tasks/${task.id}`}
                    className='hover:text-pink-800 transition-colors'>
                    {task.title}
                  </Link>

                  <div className='flex items-center'>
                    <p className='text-blue-400 w-[90px] shrink-0 text-sm py-1'>
                      언어
                    </p>
                    <span className='font-thin'>
                      {evalLanguage(task.language)}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <p className='text-blue-400 w-[90px] shrink-0 text-sm py-1'>
                      상태
                    </p>
                    <span className='font-thin'>{evalStatus(task)}</span>
                  </div>
                  <div className='flex items-center'>
                    <p className='text-blue-400 w-[90px] shrink-0 text-sm py-1'>
                      도서정보
                    </p>
                    {task?.link && (
                      <Link
                        href={task.link}
                        target='_blank'
                        className='btn btn-xs'>
                        도서정보
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
const evalLanguage = (lang: 'en' | 'jp'): string => {
  if (lang === 'en') return '영어';
  return '일본어';
};
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

function EvaluatedStatus({ task }: { task: TaskType }) {
  const commonStyle =
    'border px-2 flex justify-center items-center rounded self-center';
  if (evalStatus(task) === '지원 가능') {
    return (
      <div
        className={`bg-blue-50 border-blue-700 text-blue-700 ${commonStyle}`}>
        {evalStatus(task)}
      </div>
    );
  } else if (evalStatus(task) === '지원중')
    return (
      <div
        className={`bg-green-50 border-green-700 text-green-700 ${commonStyle}`}>
        {evalStatus(task)}
      </div>
    );
  else if (evalStatus(task) === '샘플번역가') {
    return (
      <div
        className={`bg-orange-50 border-orange-700 text-orange-700 ${commonStyle}`}>
        {evalStatus(task)}
      </div>
    );
  } else if (evalStatus(task) === '담당번역가') {
    return (
      <div className={`bg-orange-700 text-white ${commonStyle}`}>
        {evalStatus(task)}
      </div>
    );
  }
  return evalStatus(task);
}