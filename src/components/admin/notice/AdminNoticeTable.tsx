'use client';
import * as React from 'react';
import { FaFile } from 'react-icons/fa';
import Link from 'next/link';
import formatDate from '@/utils/formatDate';
import BASE_URL from '@/utils/BASE_URL';
import { NoticeType } from '@/components/my-page/MyNotices';
import AdminNoticesPagination from '@/components/admin/notice/AdminNoticesPagination';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import useToken from '@/app/hooks/useToken';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
type Props = {};

export default function AdminNoticeTable({}) {
  const token = useToken();
  const searchParams = useSearchParams();

  const { data }: any = useQuery({
    queryKey: ['adminNoticesList', searchParams.toString(), token],
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

  return (
    <section className='py-10 flex flex-col items-center w-full gap-3'>
      <h2 className='text-lg font-semibold pb-8 self-start'>
        공지사항(관리자용)
      </h2>
      <div className='w-full flex justify-end'>
        <Link href='/admin/notice/write' className='btn btn-neutral'>
          글쓰기
        </Link>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th className='w-[40px] hidden lg:table-cell' align='center'>
              번호
            </th>
            <th>제목</th>
            <th className='w-[120px] hidden lg:table-cell' align='center'>
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.notices?.map((notice: NoticeType, index: number) => (
            <tr key={`${index}-rows`}>
              <td
                className='font-thin text-sm hidden lg:table-cell'
                align='center'>
                {notice.id}
              </td>
              <td>
                <Link
                  className='font-thin text-sm sm:text-lg hover:text-blue-400 flex items-center gap-2 group transition-colors'
                  href={`/admin/notice/${notice.id}`}>
                  {notice?.title}{' '}
                  {notice?.file && (
                    <FaFile className='inline text-slate-400 group-hover:text-slate-700' />
                  )}
                </Link>
              </td>
              <td className='hidden lg:table-cell font-thin' align='center'>
                {formatDate(notice.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AdminNoticesPagination count={data?.total_pages} />
    </section>
  );
}
