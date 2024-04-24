'use client';
import Pagination from '@mui/material/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ChangeEvent } from 'react';

type Props = { count: number };

export default function MemberTasksPagination({ count }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    console.log(page);
    router.push(`/member/tasks?page=${page}`);
  };

  return (
    <Pagination
      count={count}
      onChange={handleChange}
      page={Number(searchParams.get('page')) || 1}
    />
  );
}
