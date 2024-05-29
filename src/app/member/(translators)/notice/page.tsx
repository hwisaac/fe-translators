import * as React from 'react';
import Link from 'next/link';
import formatDate from '@/utils/formatDate';
import BASE_URL from '@/utils/BASE_URL';
import { NoticeType } from '@/components/my-page/MyNotices';
import { FaFile } from 'react-icons/fa';
import NoticesPagination from '@/components/my-page/notices/MemberNoticesPagination';
import MemberNoticeSearchForm from '@/components/member/notice/MemberNoticeSearchForm';

type Props = {
  searchParams: {
    page: string;
    query: string;
    option: string;
  };
};

export default async function MemberNoticePage({
  searchParams: { page, query, option },
}: Props) {
  const data = await fetch(
    `${BASE_URL}/notices?page=${page || ''}&query=${query || ''}&option=${
      option || ''
    }&/`,
    {
      cache: 'no-cache',
    }
  ).then((res) => res.json());

  return (
    <div className='flex flex-col items-center py-10'>
      <MemberNoticeSearchForm />
      <MemberNoticeTable data={data} />
    </div>
  );
}

async function MemberNoticeTable({ data }: any) {
  return (
    <section className='py-10 flex flex-col w-full gap-3 items-center'>
      <h2 className='text-lg font-semibold pb-8 px-2 self-start'>
        번역가 공지사항
      </h2>
      <table className='table'>
        <thead>
          <tr>
            <th className='w-[40px] hidden lg:table-cell' align='center'>
              번호
            </th>
            <th>제목</th>
            <th className='w-[120px]  hidden lg:table-cell' align='center'>
              작성일
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.notices?.map((notice: NoticeType, index: number) => (
            <tr key={`${index}-tr`}>
              <td
                className='font-thin text-sm hidden lg:table-cell'
                align='center'>
                {notice.id}
              </td>
              <td>
                <Link
                  className='font-thin text-sm sm:text-lg hover:text-blue-400 flex items-center gap-2 group'
                  href={`/member/notice/${notice.id}`}>
                  {notice.title}
                  {notice?.file && (
                    <FaFile
                      className='inline text-slate-400 group-hover:text-slate-700'
                      size={12}
                    />
                  )}
                </Link>
              </td>
              <td
                className='font-thin text-xs sm:text-sm  hidden lg:table-cell'
                align='center'>
                {formatDate(notice.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <NoticesPagination count={data.total_pages} />
    </section>
  );
}
