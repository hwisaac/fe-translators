'use client';
import Pagination from '@mui/material/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

type Props = {
  count: number;
};

export default function MemberNoticesPagination({ count }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set('page', String(page));
    router.push(`/member/notice?${newSearchParams.toString()}`);
  };
  return (
    <Pagination
      count={count}
      onChange={handleChange}
      page={Number(searchParams.get('page')) || 1}
    />
  );
}
