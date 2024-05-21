'use client';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import useToken from '@/app/hooks/useToken';
import ScreenLoading from '@/components/ScreenLoading';
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
  const csrftoken = useCSRFToken();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const { mutateAsync: changePassword, isPending } = useMutation({
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
            'X-CSRFToken': csrftoken,
          },
        }
      ),
    onSuccess: (res) => {
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
  };

  useEffect(() => {
    if (errors.old_password) {
      toast.error(`기존 패스워드: ${errors.old_password.message}`);
    }
    if (errors.new_password) {
      toast.error(`새 패스워드: ${errors.new_password.message}`);
    }
    if (errors.new_password2) {
      toast.error(`새 패스워드2: ${errors.new_password2.message}`);
    }
  }, [errors]);

  return (
    <div className='flex flex-col items-center py-10'>
      <h1 className='text-2xl mb-10'>비밀번호 변경하기</h1>
      <ScreenLoading isLoading={isPending} />
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
