'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
type Props = {};

export default function MemberTabs({}: Props) {
  const [value, setValue] = useState(0);
  const router = useRouter();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push('/member/my-page');
        return;
      case 1:
        router.push('/member/task');
        return;
      case 2:
        router.push('/member/notice');
        return;
    }
  };

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
