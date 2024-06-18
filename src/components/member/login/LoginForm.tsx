'use client';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import useIsStaff from '@/app/hooks/useIsStaff';
import useLocalToken from '@/app/hooks/useLocalToken';
import ScreenLoading from '@/components/ScreenLoading';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { toast } from 'react-toastify';
type Props = {};
export type LoginDataType = {
  email: string;
  id: number;
  photo: null | string;
  token: string;
  username: string;
  is_staff: boolean;
  is_translator: boolean;
};

export default function LoginForm({}: Props) {
  const router = useRouter();
  const csrftoken = useCSRFToken();
  const { setToken, removeToken } = useLocalToken();
  const { saveIsStaff } = useIsStaff();
  const [isLoading, setIsLoading] = useState(false);
  const loginRequest = async (data: any) => {
    const response = await fetch(`${BASE_URL}/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRFToken': csrftoken ?? '',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => res.json());

    console.log(data);
  };

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ data }: any) =>
      fetch(`${BASE_URL}/users/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRFToken': csrftoken ?? '',
        },
        body: JSON.stringify(data),
        // credentials: 'include',
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data) {
        toast.error('데이터를 가져오는 데 실패했습니다.');
        return;
      }
      setToken(data.token);
      saveIsStaff(data.is_staff);

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
    console.log(data);
    // loginRequest(data);
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
