'use client';
import ExclamationIcon from '@/icons/ExclmationIcon';
import PageLayout from '@/layouts/PageLayout';
import { useRouter } from 'next/navigation';

import { FormEvent } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

type Props = {};

export default function page({}: Props) {
  return (
    <PageLayout title='로그인'>
      <h2 className='text-2xl border-b pb-10'>
        번역가방은 바른번역 회원님들만 입장 가능합니다.
      </h2>
      <LoginForm />
    </PageLayout>
  );
}

function LoginForm() {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('뭐야');
    // '/member' 페이지로 이동
    router.push('/member/my-page');
  };
  return (
    <form
      className='flex flex-col gap-3 max-w-lg mt-10 mx-auto'
      onSubmit={handleSubmit}>
      <label className='input input-bordered flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='w-4 h-4 opacity-70'>
          <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
        </svg>
        <input type='text' className='grow' placeholder='Username' />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='w-4 h-4 opacity-70'>
          <path
            fillRule='evenodd'
            d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
            clipRule='evenodd'
          />
        </svg>
        <input type='password' className='grow' value='password' />
      </label>
      <button className='btn btn-primary'>로그인</button>
      <div className='flex gap-10 relative left-2'>
        <div>아이디 찾기</div>
        <div>비밀번호 찾기</div>
      </div>
      <div className='text-slate-500'>
        <p className='flex items-start gap-2'>
          <ExclamationIcon /> 신규 가입을 원하시는 분은 번역가 참여안내 메뉴를
          참고해주세요
        </p>
        <p className='flex items-start gap-2'>
          <ExclamationIcon size='' />
          회원가입을 마치지 못한 바른번역 소속 번역가님은 바른번역 메일 주소로
          문의주시기 바랍니다.
        </p>
      </div>
    </form>
  );
}
