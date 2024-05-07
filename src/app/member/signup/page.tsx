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
type Props = {};

const years = Array.from({ length: 2023 - 1900 + 1 }, (_, i) => 2023 - i);
const days = Array.from({ length: 31 }, (_, i) => 1 + i);
const months = Array.from({ length: 12 }, (_, i) => 1 + i);

export default function page({}: Props) {
  const setLoginState = useSetRecoilState(loginAtom);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [address, setAddress] = useState<any>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ postUser }: any) =>
      axios
        .post(`${BASE_URL}/users/`, postUser, {
          headers: {
            'Content-Type': 'application/json',
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
      console.log(data, '회원가입시 데이터');
      const user = data.user;

      setLoginState({
        email: user.email,
        id: user.id,
        photo: null,
        token: data.token,
        username: user.username,
        is_staff: false,
      });
      toast.success('가입에 성공했습니다.');
      router.push('/member/additional-information');
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
    console.log(data);

    const year = data.year;
    const month = data.month;
    const day = data.day;

    const birth_date = `${year}-${month.padStart(2, 0)}-${day.padStart(2, 0)}`;
    const postUser = { ...data, birth_date, is_active: true };
    console.log(postUser);

    mutateAsync({ postUser });
  };

  const { mutateAsync: confirmMail, isPending: mailing } = useMutation({
    mutationFn: (payload: any) =>
      axios.post(`${BASE_URL}/gmail/`, payload).then((res) => res.data),
    onSuccess: (data) => {
      console.log(data);
      toast.success('코드가 생성되었습니다. 이메일을 확인해주세요');
    },
    onError: (err) => {
      console.error(err);
      toast.error('코드 생성 실패');
    },
  });
  const { mutateAsync: confirmCode } = useMutation({
    mutationFn: ({ email, code }: any) =>
      axios
        .delete(`${BASE_URL}/gmail?email=${email}&code=${code}&/`)
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
    console.log(email, code);
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
          <div className='w-[150px] text-sm'>생년월일</div>
          <select
            className='select select-bordered w-full max-w-[130px] mr-1'
            {...register('year', { required: true })}>
            <option disabled>(년)</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <select
            className='select select-bordered w-full max-w-[130px] mr-1'
            {...register('month', { required: true })}>
            <option disabled>(월)</option>
            {months.map((month) => (
              <option key={`${month}month`}>{month}</option>
            ))}
          </select>
          <select
            className='select select-bordered w-full max-w-[130px]'
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
            <div className='flex'>
              <input
                type='text'
                {...register('zonecode')}
                className='input input-bordered w-[400px]'
                placeholder='우편번호'
                value={address?.zonecode}
              />
              <DaumPostcodePopup setAddress={setAddress} />
            </div>

            <input
              type='text'
              placeholder='주소'
              {...register('address1', { required: true })}
              className='input input-bordered w-[500px]'
              value={address?.address}
            />

            <input
              type='text'
              placeholder='상세 주소'
              {...register('address2')}
              className='input input-bordered w-[500px]'
            />
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>알림</div>

          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span className='label-text mr-3 text-slate-500'>
                번역활동에 관련된 메일 및 문자 받는 것을 동의합니다.
              </span>
              <input
                type='checkbox'
                className='checkbox'
                {...register('is_subscribed')}
              />
            </label>
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
            </label>
          </div>
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
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>가입승인 코드</div>
          <input
            type='text'
            {...register('code', { required: '필수 입력입니다' })}
            placeholder='관리자에게 받은 승인 코드'
            className='input input-bordered w-full max-w-xs'
          />
          {errors.code && (
            <p className='text-red-500 ml-2'>
              {errors.code.message as React.ReactNode}
            </p>
          )}
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

const DaumPostcodePopup = ({ setAddress }: any) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      console.log('다음 주소 API 스크립트 로드 완료');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleOpenPostcode = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setAddress(data);
      },
    }).open();
  };

  return (
    <div
      onClick={(e) => handleOpenPostcode(e)}
      className='bg-slate-50 hover:bg-slate-200 transition-colors border-2 border-slate-500 text-slate-600 rounded-md w-[100px] px-4 py-1 cursor-pointer flex items-center justify-center'>
      주소 검색
    </div>
  );
};
