'use client';
import { LoginDataType, loginAtom } from '@/atoms/loginAtom';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
type Props = {};

export default function FindIdForm({}: Props) {
  const [id, setId] = useState('');
  const router = useRouter();
  const { mutateAsync: findId } = useMutation({
    mutationFn: (data: any) => {
      console.log(data);
      return axios
        .post(`${BASE_URL}/users/find-id/`, data)
        .then((res) => res.data as string);
    },
    onSuccess: (data: string) => {
      if (!data) {
        toast.error('데이터를 가져오는 데 실패했습니다.');
        return;
      }
      // @ts-ignore
      toast.success('아이디를 찾았습니다');
      setId(data);
    },
    onError: (error: AxiosError) => {
      // @ts-ignore
      toast.error(String(error.response?.data?.error));
      setId('');
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
    findId(data);
  };

  return (
    <form
      className='flex flex-col gap-3 max-w-lg mt-10 mx-auto'
      onSubmit={handleSubmit(onValid)}>
      {id && (
        <p className='pb-10'>
          아이디를 찾았습니다:{' '}
          <span className='text-lg font-semibold'>{id}</span>
        </p>
      )}
      <label className='input input-bordered flex items-center gap-2'>
        <FaUser size={12} className='text-slate-500' />
        <input
          type='email'
          className='grow'
          placeholder='email'
          {...register('email')}
        />
      </label>
      <button className='btn btn-primary'>아이디 찾기</button>
      <div className='btn' onClick={() => router.back()}>
        뒤로가기
      </div>
    </form>
  );
}
