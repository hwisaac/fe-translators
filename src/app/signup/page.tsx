'use client';
import { postSignUp } from '@/app/member/signup/actions';
import { SignupType } from '@/app/member/signup/schema';
import PageLayout from '@/layouts/PageLayout';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginAtom } from '@/atoms/loginAtom';
import useCSRFToken from '@/app/hooks/useCSRFToken';
type Props = {};

export default function page({}: Props) {
  const setLoginState = useSetRecoilState(loginAtom);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [address, setAddress] = useState<any>();
  const csrftoken = useCSRFToken();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();
  
  const { mutateAsync: createAccount, isPending } = useMutation({
    mutationFn: ({ postUser }: any) =>
      axios
        .post(`${BASE_URL}/users/editor-signup/`, postUser, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
        })
        .then((res) => res.data),
    onError: (err: AxiosError) => {
      if (
        // @ts-ignore
        err?.response?.data?.error
      ) {
        // @ts-ignore
        toast.error(`${err?.response?.data.error}`);
      } else if (err?.response?.status === 400) {
        toast.error('입력하신 정보로는 가입할 수 없습니다. 다시 확인해주세요');
      } else {
        toast.error(err.message);
      }
    },
    onSuccess: async (data) => {
      const user = data.user;
      if (user) {
        setLoginState({
          email: user.email,
          id: user.id,
          photo: null,
          token: data.token,
          username: user.username,
          is_staff: false,
          is_translator: true,
        });
      }
      toast.success('가입에 성공했습니다.');
      router.push('/translators');
    },
  });
  const phone = watch('phone');
  const password = watch('password');

  useEffect(() => {
    if (phone) {
      setValue('phone', phone.replace(/[^0-9]/g, ''));
    }
  }, [phone]);

  const onValid: SubmitHandler<any> = async (data) => {
    const postUser = {
      ...data,
      is_active: true,
      is_translator: false,
      birth_date: '1999-01-01',
    };

    createAccount({ postUser });
  };

  const { mutateAsync: confirmMail, isPending: mailing } = useMutation({
    mutationFn: (payload: any) =>
      axios
        .post(`${BASE_URL}/gmail/`, payload, {
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      toast.success('코드가 생성되었습니다. 이메일을 확인해주세요');
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });
  const { mutateAsync: confirmCode } = useMutation({
    mutationFn: ({ email, code }: any) =>
      axios
        .delete(`${BASE_URL}/gmail?email=${email}&code=${code}&/`, {
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      toast.success('코드인증 성공');
      setEmailConfirmed(true);
    },
    onError: (err) => {
      toast.error('코드인증 실패');
    },
  });
  const handleConfirmEmail = () => {
    if (mailing) return;
    const email = watch('email');
    confirmMail({ email });
  };
  const handleConfirmCode = () => {
    const email = watch('email');
    const code = watch('emailCode');
    confirmCode({ email, code });
  };
  return (
    <PageLayout title='회원가입'>
      <h2 className='w-full border-b pb-3 text-lg mb-10'>
        회원가입 정보 - 모두 필수항목입니다.
      </h2>
      <form className='space-y-5' onSubmit={handleSubmit(onValid)}>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>아이디</div>
          <input
            type='text'
            // name='username'
            placeholder='아이디'
            className='input input-bordered w-full max-w-xs'
            {...register('username', { required: '필수 입력항목입니다.' })}
          />
          {errors.username && (
            <p className='text-red-500 ml-2'>
              {errors.username.message as React.ReactNode}
            </p>
          )}
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>비밀번호</div>
          <input
            type='password'
            placeholder='********'
            className='input input-bordered w-full max-w-xs'
            {...register('password', { required: true, minLength: 8 })}
          />
          {errors.password && (
            <p className='text-red-500 ml-2'>
              비밀번호는 8자 이상이어야 합니다.
            </p>
          )}
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>비밀번호 확인</div>
          <input
            type='password'
            placeholder='********'
            className='input input-bordered w-full max-w-xs'
            {...register('password2', {
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
          />

          {errors.password2 && (
            <p className='text-red-500 ml-2'>
              {errors.password2.message as React.ReactNode}
            </p>
          )}
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>이름</div>
          <input
            type='text'
            placeholder='이름'
            className='input input-bordered w-full max-w-xs'
            {...register('name', { required: '필수 입력항목입니다.' })}
          />
          {errors.name && (
            <p className='text-red-500 ml-2'>
              {errors.name.message as React.ReactNode}
            </p>
          )}
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>소속 출판사</div>
          <input
            type='text'
            placeholder='소속 출판사'
            className='input input-bordered w-full max-w-xs'
            {...register('company', { required: '필수 입력항목입니다.' })}
          />
          {errors.name && (
            <p className='text-red-500 ml-2'>
              {errors.name.message as React.ReactNode}
            </p>
          )}
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>이메일</div>
          <div className='flex flex-col gap-2'>
            <div className='join'>
              <input
                type='email'
                placeholder='translator@barunmc.com'
                className='input input-bordered w-full max-w-xs join-item'
                disabled={emailConfirmed}
                {...register('email', {
                  required: true,
                })}
              />
              <div
                className={`btn join-item ${emailConfirmed && 'btn-disabled'}`}
                onClick={handleConfirmEmail}>
                {mailing ? (
                  <span className='loading loading-spinner loading-sm' />
                ) : emailConfirmed ? (
                  '인증됨'
                ) : (
                  '인증하기'
                )}
              </div>
            </div>
            {!emailConfirmed && (
              <div className='join'>
                <input
                  type='text'
                  placeholder='XXXXXX'
                  className='input input-bordered w-full max-w-xs join-item'
                  {...register('emailCode')}
                />
                <div className='btn join-item' onClick={handleConfirmCode}>
                  코드입력
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>핸드폰번호</div>
          <input
            type='tel'
            {...register('phone', { required: true })}
            placeholder="'-' 제외"
            className='input input-bordered w-full max-w-xs'
          />
          {errors.phone && (
            <p className='text-red-500 ml-2'>
              {errors.phone.message as React.ReactNode}
            </p>
          )}
        </div>

        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>정보 제공</div>

          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span className='label-text mr-3 text-slate-500'>
                바른번역에 개인정보를 제공하는 것에 동의합니다.
              </span>
              <input
                type='checkbox'
                className='checkbox'
                {...register('is_allowed', {
                  required: '개인정보 제공에 동의해야 합니다.',
                })}
              />
              {errors.is_allowed && (
                <p className='text-red-500 ml-2'>
                  {errors.is_allowed.message as React.ReactNode}
                </p>
              )}
            </label>
          </div>
        </div>

        <button
          className='btn btn-neutral btn-wide relative top-5'
          disabled={!emailConfirmed}>
          {isPending && <span className='loading loading-spinner loading-xs' />}
          {!emailConfirmed ? '이메일 인증을 해야합니다' : `회원가입`}
        </button>
      </form>
    </PageLayout>
  );
}
