'use client';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import useLocalToken from '@/app/hooks/useLocalToken';
import { LoginDataType, loginAtom } from '@/atoms/loginAtom';
import ScreenLoading from '@/components/ScreenLoading';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { on } from 'events';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
type Props = {};

export default function LoginForm({}: Props) {
  const router = useRouter();
  const csrftoken = useCSRFToken();
  const {setToken, removeToken} = useLocalToken()
  const [loginState, setLoginState] = useRecoilState(loginAtom);

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ data }: any) =>
      axios
        .post(`${BASE_URL}/users/login/`, data, {
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
        .then((res) => res.data as LoginDataType),
    onSuccess: (data) => {
      if (!data) {
        toast.error('데이터를 가져오는 데 실패했습니다.');
        return;
      }
      setToken(data.token)

      setLoginState(data);
      if (data.is_staff) {
        router.push('/admin/tasks/');
      } else {
        router.push('/member/my-page/');
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
      // @ts-ignore
      toast.error(String(error.response?.data?.error));
      setLoginState(null);
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const onValid: SubmitHandler<any> = async (data) => {
    login({ data });
  };

  return (
    <form
      className='flex flex-col gap-3 max-w-lg mt-10 mx-auto'
      onSubmit={handleSubmit(onValid)}>
      <ScreenLoading isLoading={isPending} />
      <label className='input input-bordered flex items-center gap-2'>
        <FaUser size={12} className='text-slate-500' />
        <input
          type='text'
          className='grow'
          placeholder='Username'
          {...register('username')}
        />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        <FaLock size={12} className='text-slate-500' />
        <input
          type='password'
          className='grow'
          placeholder='Password'
          {...register('password')}
        />
      </label>
      <button className='btn btn-primary text-lg'>로그인</button>
    </form>
  );
}
