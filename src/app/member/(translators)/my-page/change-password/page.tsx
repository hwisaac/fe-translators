'use client';
import useToken from '@/app/hooks/useToken';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {};

export default function page({}: Props) {
  const router = useRouter();
  const token = useToken();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const { mutateAsync: changePassword } = useMutation({
    mutationKey: ['password-change'],
    mutationFn: (payload: any) =>
      axios.put(
        `${BASE_URL}/users/me/change-password/`,
        {
          ...payload,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      ),
    onSuccess: (res) => {
      console.log(res);
      toast.success('비밀번호가 변경되었습니다.');
      router.push('/member/my-page');
    },
    onError: (error) => {
      console.dir(error);
      // @ts-ignore
      toast.error(JSON.stringify(error.response.data));
    },
  });

  const onValid = (data: any) => {
    const old_password = data.old_password;
    const new_password = data.new_password;
    const new_password2 = data.new_password2;

    if (new_password !== new_password2) {
      toast.error('새 패스워드가 동일하지 않습니다.');
      return;
    }
    changePassword(data);
    console.log(data);
  };

  useEffect(() => {
    console.log(errors.old_password);
    if (errors.old_password) {
      toast.error(errors.old_password.message as string);
    }
    if (errors.new_password) {
      toast.error(errors.new_password.message as string);
    }
    if (errors.new_password2) {
      toast.error(errors.new_password2.message as string);
    }
  }, [errors]);

  return (
    <div className='flex flex-col items-center py-10'>
      <h1 className='text-2xl mb-10'>비밀번호 변경하기</h1>
      <form
        action=''
        className='flex flex-col gap-2'
        onSubmit={handleSubmit(onValid)}>
        <div className='flex items-center border-b mb-8 pb-8'>
          <div className='w-[190px] text-sm'>기존 비밀번호</div>
          <input
            type='password'
            placeholder='********'
            className='input input-bordered w-full max-w-xs'
            {...register('old_password', {
              required: '필수 입력입니다.',
            })}
          />
        </div>
        <div className='flex items-center'>
          <div className='w-[190px] text-sm'>새 비밀번호</div>
          <input
            type='password'
            placeholder='********'
            className='input input-bordered w-full max-w-xs'
            {...register('new_password', {
              required: '필수 입력입니다.',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이어야 합니다.',
              },
            })}
          />
        </div>
        <div className='flex items-center'>
          <div className='w-[190px] text-sm'>새 비밀번호 재입력</div>
          <input
            type='password'
            placeholder='********'
            className='input input-bordered w-full max-w-xs'
            {...register('new_password2', {
              required: '필수 입력입니다.',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이어야 합니다.',
              },
            })}
          />
        </div>
        <button className='btn btn-neutral my-10'>변경</button>
      </form>
    </div>
  );
}
