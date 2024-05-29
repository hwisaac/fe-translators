'use client';
import useLoginData from '@/app/hooks/useLoginData';
import useLogout from '@/app/hooks/useLogout';
import useToken from '@/app/hooks/useToken';
import { loginAtom } from '@/atoms/loginAtom';
import MyNotices from '@/components/my-page/MyNotices';
import MyTasks from '@/components/my-page/MyTasks';
import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

type Props = {};

export default function page({}: Props) {
  const [isClient, setIsClient] = useState(false);
  const logout = useLogout();
  const router = useRouter();
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
        .then((res) => res.data)
        .catch((err: AxiosError) => {
          if (err.response?.status === 403) {
            toast.error('Forbidden');
            logout();
          }
        }),
  });

  if (!isClient) return null;
  return (
    <div className='flex flex-col items-center'>
      <section className='sm:border-8 border-slate-200 px-2 sm:px-10 sm:py-5 flex flex-col gap-2 lg:flex-row justify-center lg:justify-between items-center w-full'>
        <h2 className=''>
          <span className='font-semibold'>{loginData?.username}</span>
          님, 번역가방에 오신 것을 환영합니다.
        </h2>

        <div className='flex join'>
          <Link
            href='/member/my-page/change-password'
            className='btn join-item'>
            비밀번호 변경
          </Link>
          <Link href='/member/private-information' className='btn join-item'>
            개인정보 수정
          </Link>
          <Link href='/member/additional-information' className='btn join-item'>
            추가정보 수정
          </Link>
        </div>
      </section>
      <MyTasks />
      <MyNotices />
    </div>
  );
}
