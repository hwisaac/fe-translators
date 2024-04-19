'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';
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

export default function MemberTabs({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(valueFromPath(pathname));

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push('/member/my-page');
        return;
      case 1:
        router.push('/member/tasks');
        return;
      case 2:
        router.push('/member/notice');
        return;
    }
  };
  useEffect(() => {
    setValue(valueFromPath(pathname));
  }, [pathname]);
  // URL 변경 시 탭 상태 업데이트

  return (
    <div className='w-full border-b flex justify-center relative top-[50px]'>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label='마이페이지' style={{ fontSize: '1.3rem' }} />

        <Tab label='수주게시판' style={{ fontSize: '1.3rem' }} />

        <Tab label='공지사항' style={{ fontSize: '1.3rem' }} />
      </Tabs>
    </div>
  );
}
