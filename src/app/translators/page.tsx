'use client';
import React, { Suspense } from 'react';
import PageLayout from '@/layouts/PageLayout';
import { BiMessageDetail } from 'react-icons/bi';
import TranslatorSearchForm from '@/components/translators/TranslatorSearchForm';
import Link from 'next/link';
import { formatLink } from '@/utils/formatLink';
import TranslatorPagination from '@/components/translators/TranslatorPagination';
import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ScreenLoading from '@/components/ScreenLoading';

type GetUsersType = {
  page: number;
  total_pages: number;
  total_items: number;
  users: UserType[];
};
type UserType = {
  id: number;
  username: string;
  name: string;
  pen_name: string;
  major_works: string;
  biography: string;
  works: string;
  is_public: true;
  languages: string[];
  styles: string[];
  specializations: string[];
  tags: string[];
};

export default function Page() {
  return (
    <PageLayout title='번역가 소개'>
      <Suspense fallback={<ScreenLoading isLoading={true} />}>
        <TranslatorPageContent />
      </Suspense>
    </PageLayout>
  );
}

function TranslatorPageContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';
  const language = searchParams.get('language') || '';
  const specialization = searchParams.get('specialization') || '';

  const { data, isLoading } = useQuery({
    queryKey: ['translators', page, query, language, specialization],
    queryFn: () =>
      axios
        .get(
          `${BASE_URL}/users?page=${page}&query=${query}&language=${language}&specialization=${specialization}`
        )
        .then((res) => res.data),
  });

  const { data: checkBoxes, isLoading: isFetchingCheckBoxes } = useQuery({
    queryKey: ['checkBoxes'],
    queryFn: () =>
      axios.get(`${BASE_URL}/users/check-boxes/`).then((res) => res.data),
  });

  if (isLoading || isFetchingCheckBoxes) {
    return <ScreenLoading isLoading={true} />;
  }

  return (
    <>
      <TranslatorSearchForm checkBoxes={checkBoxes} />
      <TranslatorTable data={data} />
    </>
  );
}

function TranslatorTable({ data }: { data: GetUsersType }) {
  return (
    <section className='py-10 flex flex-col w-full gap-3'>
      <table className='hidden sm:table'>
        <thead>
          <tr>
            <td align='center'>번역가</td>
            <td align='center'>언어</td>
            <td align='center'>분야</td>
            <td align='center'>주요 역서</td>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user, index: number) => (
            <tr key={`${index}-rows`}>
              <td align='center'>
                <Link
                  href={`/translators/${user.id}`}
                  className='text-sm lg:text-lg text-blue-400 hover:text-blue-700 transition-colors font-thin'>
                  {user.pen_name ? user.pen_name : user.name}
                </Link>
              </td>
              <td align='center' className='lg:text-lg text-sm font-thin'>
                {user.languages.join(', ')}
              </td>
              <td align='center' className='lg:text-lg text-sm font-thin'>
                {user.specializations.join(', ')}
              </td>
              <td align='center'>
                <span className='lg:text-lg text-sm font-thin'>
                  {user.major_works}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='sm:hidden'>
        <thead></thead>
        <tbody>
          {data?.users?.map((user, index: number) => (
            <tr
              key={`${index}-rows`}
              className='w-full border-b hover:bg-gray-50 cursor-pointer'>
              <Link href={`/translators/${user.id}`} className='w-full block'>
                <td className='font-thin text-sm space-y-1 w-full px-2 py-2'>
                  <p className='font-normal text-lg'>
                    {user.pen_name ? user.pen_name : user.name}
                  </p>
                  <div className='flex'>
                    <p className='text-blue-400 w-[90px] shrink-0'>언어</p>
                    <span>{user.languages.join(', ')}</span>
                  </div>
                  <div className='flex'>
                    <p className='text-blue-400 w-[90px] shrink-0'>주요 분야</p>
                    <span>{user.specializations.join(', ')}</span>
                  </div>
                  <div className='flex'>
                    <p className='text-blue-400 w-[90px] shrink-0'>주요 역서</p>
                    <span className='lg:text-md text-sm'>
                      {user.major_works}
                    </span>
                  </div>
                </td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
      <TranslatorPagination count={data?.total_pages ?? 1} />
    </section>
  );
}
