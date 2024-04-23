'use client';
import useLoginData from '@/app/hooks/useLoginData';
import useToken from '@/app/hooks/useToken';
import { loginAtom } from '@/atoms/loginAtom';
import MyNotices from '@/components/my-page/MyNotices';
import MyTasks from '@/components/my-page/MyTasks';
import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {};

export default function page({}: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const token = useToken();
  const loginData = useRecoilValue(loginAtom);

  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data),
  });

  if (!isClient) return null;
  return (
    <div className='flex flex-col items-center py-10'>
      <section className='border-8 border-slate-200 px-10 py-5 flex justify-between items-center w-full'>
        <h2>
          <span className='font-semibold'>{loginData?.username}</span>
          님, 번역가방에 오신 것을 환영합니다.
        </h2>

        <div className='flex join'>
          <Link
            href='/member/my-page/change-password'
            className='btn join-item'>
            비밀번호 변경
          </Link>
          <button className='btn join-item'>내정보 수정 변경</button>
          <button className='btn join-item'>회원 탈퇴</button>
        </div>
      </section>
      <MyTasks />
      <MyNotices />
    </div>
  );
}
