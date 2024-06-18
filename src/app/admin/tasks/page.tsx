'use client';
import * as React from 'react';
import BASE_URL from '@/utils/BASE_URL';
import AdminSearchForm from '@/components/admin/tasks/AdminSearchForm';
import { useQuery } from '@tanstack/react-query';
import AdminTasksTable from '@/components/admin/tasks/AdminTasksTable';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/zustand/useAuthStore';

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
  const { loginState } = useAuthStore();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const query = searchParams.get('query');
  const status = searchParams.get('status');
  const language = searchParams.get('language');

  const url = `${BASE_URL}/tasks/admin?page=${page ?? ''}&language=${
    language ?? ''
  }&query=${query ?? ''}&status=${status ?? ''}&/`;

  // const getAdminTasksList = async () => {
  //   const json = await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: loginState?.token ?? '',
  //     },
  //   }).then((res) => res.json());
  //   console.log('json', json);
  //   // setData(json);
  // };
  // React.useEffect(() => {
  //   getAdminTasksList();
  // }, ['adminTasksList', page, query, status, language, loginState]);

  const { data } = useQuery({
    queryKey: ['adminTasksList', page, query, status, language, loginState],
    queryFn: () =>
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: loginState?.token ?? '',
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error('error 뭐라하냥', error)),
  });
  // console.log('admin tasks page token :', token);
  // const { data } = useQuery({
  //   queryKey: ['adminTasksList', page, query, status, language, token],
  //   queryFn: () =>
  //     axios
  //       .get(
  //         url,
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       )
  //       .then((res) => res.data)
  //       .catch((error) => {
  //         console.error('error 뭐라하냐', error);
  //         toast.error('권한이 없습니다');
  //         // logout();
  //       }),
  // });
  return (
    <div className='flex flex-col items-center py-10'>
      <AdminSearchForm />
      <AdminTasksTable data={data} />
    </div>
  );
}
