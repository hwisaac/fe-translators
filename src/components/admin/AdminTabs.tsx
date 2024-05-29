'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';
type Props = {};

const valueFromPath = (pathname: string): number => {
  if (pathname.includes('/tasks')) {
    return 0;
  }
  if (pathname.includes('/notice')) {
    return 1;
  }

  return 0;
};

export default function AdminTabs({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(valueFromPath(pathname));

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    setValue(valueFromPath(pathname));
  }, [pathname]);
  // URL 변경 시 탭 상태 업데이트

  return (
    <div className='w-full border-b flex justify-center relative mt-[80px] lg:mt-[0px] mb-4'>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label='수주게시판'
          style={{ fontSize: '1.3rem' }}
          onClick={() => router.push('/admin/tasks')}
        />
        <Tab
          label='공지사항'
          style={{ fontSize: '1.3rem' }}
          onClick={() => router.push('/admin/notice')}
        />
      </Tabs>
    </div>
  );
}
