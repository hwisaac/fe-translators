'use client';
import Pagination from '@mui/material/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

type Props = {
  count: number;
};

export default function NoticesPagination({ count }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    console.log(page);
    router.push(`/member/notice?page=${page}`);
  };
  return (
    <Pagination
      count={count}
      onChange={handleChange}
      page={Number(searchParams.get('page')) || 1}
    />
  );
}
