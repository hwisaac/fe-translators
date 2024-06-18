'use client';

import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import LanguageBadge from '@/components/member/tasks/LanguageBadge';
import { evalLanguage, evalStatus } from '@/utils/commons';
import { useAuthStore } from '@/zustand/useAuthStore';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

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
  const { loginState } = useAuthStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data } = useQuery({
    queryKey: ['my-tasks', loginState?.token ?? ''],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/me/my-tasks/`, {
          headers: {
            Authorization: loginState?.token ?? '',
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
            <th className='hidden lg:table-cell w-[40px]' align='center'>
              번호
            </th>
            <th>도서제목</th>
            <th className='w-[100px]' align='center'>
              도서정보
            </th>
            <th className='w-[100px]' align='center'>
              언어
            </th>
            <th className='w-[150px]' align='center'>
              상태
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((task: any, index: number) => {
            return (
              <tr key={`${index}-rows`}>
                <td className='hidden lg:block font-thin' align='center'>
                  {task.id}
                </td>
                <td>
                  <Link
                    href={`/member/tasks/${task.id}`}
                    className=' text-[16px] font-thin hover:font-normal'>
                    {task.title}
                  </Link>
                </td>

                <td align='center'>
                  {task?.link && (
                    <Link
                      href={task.link}
                      target='_blank'
                      className='btn btn-sm'>
                      <FaExternalLinkAlt />
                    </Link>
                  )}
                </td>
                <td className='' align='center'>
                  <LanguageBadge language={task.language} />
                </td>
                <td className='' align='center'>
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
                <td className='flex flex-col border-b gap-1 py-3 px-2 hover:bg-slate-50 transition-colors first:border-t'>
                  <Link
                    href={`/member/tasks/${task.id}`}
                    className='hover:text-blue-800 transition-colors'>
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
                    <span className='fonts-thin'>{evalStatus(task)}</span>
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

function EvaluatedStatus({ task }: { task: TaskType }) {
  const commonStyle =
    'border px-2 flex justify-center items-center rounded self-center w-[150px]';
  if (evalStatus(task) === '지원 가능') {
    return (
      <div
        className={`bg-blue-50 border-blue-500 text-blue-700 ${commonStyle}`}>
        {evalStatus(task)}
      </div>
    );
  } else if (evalStatus(task) === '지원중')
    return (
      <div
        className={`bg-green-50 border-green-500 text-green-700 ${commonStyle}`}>
        {evalStatus(task)}
      </div>
    );
  else if (evalStatus(task) === '샘플번역가') {
    return (
      <div
        className={`bg-orange-50 border-orange-500 text-orange-700 ${commonStyle}`}>
        {evalStatus(task)}
      </div>
    );
  } else if (evalStatus(task) === '담당번역가') {
    return (
      <div
        className={`bg-orange-50 border-orange-500 text-orange-700 ${commonStyle}`}>
        {evalStatus(task)}
      </div>
    );
  }
  return evalStatus(task);
}