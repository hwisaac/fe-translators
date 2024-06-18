'use client';
import useMe from '@/app/hooks/useMe';
import MyNotices from '@/components/my-page/MyNotices';
import MyTasks from '@/components/my-page/MyTasks';
import BASE_URL from '@/utils/BASE_URL';
import { useAuthStore } from '@/zustand/useAuthStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {};

export default function page({}: Props) {
  const [isClient, setIsClient] = useState(false);
  const [me, setMe] = useState(null);
  const { loginState } = useAuthStore();

  useEffect(() => {
    setIsClient(true);
    if (loginState) {
      console.log(`my-page useEffect 의 token ${loginState.token}`);
      fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          Authorization: loginState.token,
        },
      }).then(async (res) => {
        const json = await res.json();
        console.log('useMe(X) my-page useEffect 의 response', json);
        setMe(json);
      });
    }
  }, [loginState]);
  // const { me } = useMe();

  // useEffect(() => {
  //   setIsClient(true);
  //   console.log('my-page, useMe 의 응답값(me): ', me);
  // }, [me]);

  if (!isClient) return null;
  return (
    <div className='flex flex-col items-center'>
      <section className='sm:border-0 border-slate-200 px-2 sm:px-10 py-2  sm:py-5 flex flex-col gap-2 lg:flex-row justify-center lg:justify-between items-center w-full shadow-md rounded bg-gray-50'>
        <h2 className=''>
          <span className='font-semibold'>{me?.username}</span>
          님, 번역가방에 오신 것을 환영합니다.
        </h2>

        <div className='flex join'>
          <Link
            href='/member/my-page/change-password'
            className='btn join-item btn-outline btn-sm'>
            비밀번호 변경
          </Link>
          <Link
            href='/member/private-information'
            className='btn join-item btn-outline btn-sm'>
            개인정보 수정
          </Link>
          <Link
            href='/member/additional-information'
            className='btn join-item btn-outline btn-sm'>
            추가정보 수정
          </Link>
        </div>
      </section>
      <MyTasks />
      <MyNotices />
    </div>
  );
}
