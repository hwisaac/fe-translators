'use client';
import Pagination from '@mui/material/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

type Props = {
  count: number;
};

export default function TranslatorPagination({ count }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set('page', String(page));
    router.push(`/translators?${newSearchParams.toString()}`);
  };
  return (
    <div className='self-center'>
      <Pagination
        count={count}
        onChange={handleChange}
        page={Number(searchParams.get('page')) || 1}
      />
    </div>
  );
}
