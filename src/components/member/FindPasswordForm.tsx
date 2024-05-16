'use client';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import { LoginDataType, loginAtom } from '@/atoms/loginAtom';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { on } from 'events';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
type Props = {};

export default function FindPasswordForm({}: Props) {
  const csrftoken = useCSRFToken();
  const router = useRouter();
  const { mutateAsync: findPassword, isPending } = useMutation({
    mutationFn: (data: any) => {
      return axios
        .post(`${BASE_URL}/users/find-password/`, data, {
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
        .then((res) => res.data as string);
    },
    onSuccess: (data: string) => {
      // @ts-ignore
      toast.success('메일로 임시 비밀번호를 전송했습니다.');
    },
    onError: (error: AxiosError) => {
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
    console.log(data);
    findPassword(data);
  };

  return (
    <form
      className='flex flex-col gap-3 max-w-lg mt-10 mx-auto'
      onSubmit={handleSubmit(onValid)}>
      <label className='input input-bordered flex items-center gap-2'>
        <FaUser size={12} className='text-slate-500' />
        <input
          type='email'
          className='grow'
          placeholder='이메일'
          {...register('email')}
        />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        <FaUser size={12} className='text-slate-500' />
        <input
          type='text'
          className='grow'
          placeholder='아이디'
          {...register('username')}
        />
      </label>
      <button className='btn btn-primary'>
        {isPending && <span className='loading loading-spinner' />}
        패스워드 찾기
      </button>
      <div className='btn' onClick={() => router.back()}>
        뒤로가기
      </div>
    </form>
  );
}
