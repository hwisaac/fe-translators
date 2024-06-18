'use client';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import DaumPostcodePopup from '@/components/member/DaumPostcodePopup';
import useMe from '@/app/hooks/useMe';
import ScreenLoading from '@/components/ScreenLoading';
import { useAuthStore } from '@/zustand/useAuthStore';
type Props = {};

const years = Array.from({ length: 2023 - 1900 + 1 }, (_, i) => 2023 - i);
const days = Array.from({ length: 31 }, (_, i) => 1 + i);
const months = Array.from({ length: 12 }, (_, i) => 1 + i);

export default function PrivateInformationForm({}: Props) {
  const [emailConfirmed, setEmailConfirmed] = useState(true); // 메일 인증 활성화
  const csrftoken = useCSRFToken();
  //   const [address, setAddress] = useState<any>();
  const { loginState } = useAuthStore();
  const router = useRouter();
  const { me } = useMe();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();
  useEffect(() => {
    if (me) {
      setValue('name', me.name);
      setValue('email', me.email);
      setValue('phone', me.phone);
      setValue('is_domestic', me.is_domestic);
      setValue('subscribed', me.subscribed);
      setValue('address1', me.address1);
      setValue('address2', me.address2);
      setValue('zonecode', me.zonecode);
      setValue('gender', me.gender);
      if (me?.birth_date) {
        const birth_date = me?.birth_date.split('-');
        console.log('birth_date', birth_date);
        setValue('year', birth_date[0]);
        setValue('month', parseInt(birth_date[1], 10));
        setValue('day', parseInt(birth_date[2], 10));
      }
    }
  }, [me]);
  const { mutateAsync, isPending: puttingUser } = useMutation({
    mutationFn: ({ putUser }: any) =>
      axios
        .put(`${BASE_URL}/users/me/`, putUser, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            Authorization: loginState?.token ?? '',
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
      toast.success('수정되었습니다.');
      router.push('/member');
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
    const year = data.year;
    const month = data.month;
    const day = data.day;

    const birth_date = `${year}-${month.padStart(2, 0)}-${day.padStart(2, 0)}`;
    const putUser = { ...data, birth_date };

    mutateAsync({ putUser });
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
      toast.error('코드 생성 실패');
    },
  });
  const { mutateAsync: confirmCode, isPending: confirmingCode } = useMutation({
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
    <form
      className='space-y-5 mt-[50px] lg:mt-0 px-2'
      onSubmit={handleSubmit(onValid)}>
      <ScreenLoading isLoading={confirmingCode || mailing || puttingUser} />
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
        <div className='w-[150px] text-sm'>이메일</div>
        <div className='flex flex-col gap-2'>
          <div className='join'>
            <input
              type='email'
              placeholder='translator@barunmc.com'
              className='input input-bordered w-full max-w-xs join-item'
              disabled={emailConfirmed}
              {...register('email', { required: true })}
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
        <div className='w-[150px] text-sm'>국내거주</div>
        <div className='form-control'>
          <label className='label cursor-pointer'>
            <span className='label-text mr-3 text-slate-500'>
              국내에 거주시 체크
            </span>
            <input
              type='checkbox'
              className='checkbox'
              defaultChecked
              {...register('is_domestic')}
            />
          </label>
        </div>
      </div>

      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>생년월일</div>
        <select
          className='select select-bordered w-full max-w-[110px] mr-1'
          {...register('year', { required: true })}>
          <option disabled>(년)</option>
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
        <select
          className='select select-bordered w-full max-w-[110px] mr-1'
          {...register('month', { required: true })}>
          <option disabled>(월)</option>
          {months.map((month) => (
            <option key={`${month}month`}>{month}</option>
          ))}
        </select>
        <select
          className='select select-bordered w-full max-w-[110px]'
          {...register('day', { required: true })}>
          <option disabled>(일)</option>
          {days.map((day) => (
            <option key={`${day}day`}>{day}</option>
          ))}
        </select>
      </div>
      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>성별</div>
        <label className='label cursor-pointer space-x-1'>
          <span className='label-text'>여자</span>
          <input
            {...register('gender')}
            type='radio'
            name='gender'
            value='female'
            className='radio'
            defaultChecked
          />
        </label>
        <label className='label cursor-pointer space-x-1 mr-3'>
          <span className='label-text'>남자</span>
          <input
            type='radio'
            value='male'
            className='radio'
            {...register('gender')}
          />
        </label>
      </div>

      <div className='flex'>
        <div className='w-[150px] text-sm'>주소</div>
        <div className='flex flex-col gap-1'>
          <div className='flex join'>
            <input
              type='text'
              {...register('zonecode')}
              className='input input-bordered w-[100px] lg:w-[400px] join-item'
              placeholder='우편번호'
            />
            <DaumPostcodePopup setValue={setValue} />
          </div>

          <input
            type='text'
            placeholder='주소'
            {...register('address1', { required: true })}
            className='input input-bordered w-[300px] lg:w-[500px]'
          />

          <input
            type='text'
            placeholder='상세 주소'
            {...register('address2')}
            className='input input-bordered w-[300px] lg:w-[500px]'
          />
        </div>
      </div>
      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>알림 방식</div>

        <div className='form-control'>
          <label className='label cursor-pointer'>
            <label className='label cursor-pointer space-x-1 mr-3'>
              <span className='label-text'>E-mail</span>
              <input
                type='radio'
                className='radio'
                value='email'
                {...register('subscribed')}
                defaultChecked
              />
            </label>
            <label className='label cursor-pointer space-x-1 mr-3'>
              <span className='label-text'>카카오톡</span>
              <input
                type='radio'
                {...register('subscribed')}
                className='radio'
                value='kakao'
              />
            </label>
            <label className='label cursor-pointer space-x-1 mr-3'>
              <span className='label-text'>수신거부</span>
              <input
                type='radio'
                {...register('subscribed')}
                className='radio'
                value='none'
              />
            </label>
          </label>
        </div>
      </div>
      <button
        className='btn btn-neutral btn-wide relative top-5'
        // disabled={!emailConfirmed}
        disabled={false}>
        {puttingUser && <span className='loading loading-spinner loading-xs' />}
        {/* {!emailConfirmed ? '이메일 인증을 해야합니다' : `수정하기`} */}
        수정하기
      </button>
    </form>
  );
}
