'use client';
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

import LanguageBadge from '@/components/member/tasks/LanguageBadge';
import AdminSearchForm from '@/components/admin/tasks/AdminSearchForm';
import AdminTasksPagination from '@/components/admin/tasks/AdminTasksPagination';
import StatusBadge from '@/components/StatusBadge';
import { formatLink } from '@/utils/formatLink';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useToken from '@/app/hooks/useToken';
import AdminTasksTable from '@/components/admin/tasks/AdminTasksTable';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

type Props = {
  searchParams: {
    page: string;
    query: string;
    language: string;
    status: string;
  };
};
type TaskType = {
  id: number;
  status: 'open' | 'testing' | 'closed' | 'completed';
  title: string;
  language: 'en' | 'jp';
  count_comments: number;
  link: string;
};

export default function AdminTasksPage() {
  const token = useToken();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const query = searchParams.get('query');
  const status = searchParams.get('status');
  const language = searchParams.get('language');
  // const data = await fetch(
  // `${BASE_URL}/tasks/admin?page=${page ?? ''}&language=${
  //   language ?? ''
  // }&query=${query ?? ''}&status=${status ?? ''}&/`,
  //   {
  //     cache: 'no-cache',
  //   }
  // ).then((data) => data.json());

  const { data } = useQuery({
    queryKey: ['adminTasksList', page, query, status, language],
    queryFn: () =>
      axios
        .get(
          `${BASE_URL}/tasks/admin?page=${page ?? ''}&language=${
            language ?? ''
          }&query=${query ?? ''}&status=${status ?? ''}&/`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => res.data)
        .catch((error) => toast.error('권한이 없습니다')),
  });
  return (
    <div className='flex flex-col items-center py-10'>
      <AdminSearchForm />
      <AdminTasksTable data={data} />
    </div>
  );
}
