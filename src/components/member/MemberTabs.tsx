'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';
import useMe from '@/app/hooks/useMe';
type Props = {};

const valueFromPath = (pathname: string): number => {
  if (pathname.includes('/my-page')) {
    return 0;
  }
  if (pathname.includes('/tasks')) {
    return 1;
  }
  if (pathname.includes('/notice')) {
    return 2;
  }
  return 0;
};
function extractLang(langArr: string[]): string {
  const result: string[] = [];
  langArr.forEach((lang) => {
    if (lang === '일본어') {
      result.push('jp');
    }
    if (lang === '영어') {
      result.push('en');
    }
  });
  return result.join(',');
}

export default function MemberTabs({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(valueFromPath(pathname));

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    setValue(valueFromPath(pathname));
  }, [pathname]);
  return (
    <div className='w-full border-b flex justify-center relative mt-[100px] lg:mt-[50px]'>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label='마이페이지'
          style={{ fontSize: '1.3rem' }}
          onClick={() => router.push('/member/my-page')}
        />

        <Tab
          label='수주게시판'
          style={{ fontSize: '1.3rem' }}
          onClick={() => router.push(`/member/tasks`)}
        />

        <Tab
          label='공지사항'
          style={{ fontSize: '1.3rem' }}
          onClick={() => router.push('/member/notice')}
        />
      </Tabs>
    </div>
  );
}
