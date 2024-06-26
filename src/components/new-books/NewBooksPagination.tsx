'use client';
import Pagination from '@mui/material/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

type Props = {
  total_pages: number;
};

export default function NewBooksPagination({ total_pages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set('page', String(page));
    router.push(`/new-books?${newSearchParams.toString()}`);
  };

  return (
    <div className='w-full flex justify-center my-10'>
      <Pagination
        count={total_pages}
        onChange={handleChange}
        page={Number(searchParams.get('page')) || 1}
      />
    </div>
  );
}
