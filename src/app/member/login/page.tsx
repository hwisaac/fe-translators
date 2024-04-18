'use client';
import ExclamationIcon from '@/icons/ExclmationIcon';
import PageLayout from '@/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { FormEvent } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';

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

    // '/member' 페이지로 이동
    router.push('/member/my-page');
  };
  return (
    <form
      className='flex flex-col gap-3 max-w-lg mt-10 mx-auto'
      onSubmit={handleSubmit}>
      <label className='input input-bordered flex items-center gap-2'>
        <FaUser size={12} className='text-slate-500' />
        <input type='text' className='grow' placeholder='Username' />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        <FaLock size={12} className='text-slate-500' />
        <input type='password' className='grow' placeholder='password' />
      </label>
      <button className='btn btn-primary'>로그인</button>
      <div className='flex gap-10 relative left-2'>
        <div>아이디 찾기</div>
        <div>비밀번호 찾기</div>
      </div>
      <div className='text-slate-500'>
        <p className='flex items-start gap-2'>
          - 신규 가입을 원하시는 분은 번역가 참여안내 메뉴를 참고해주세요
        </p>
        <p className='flex items-start gap-2'>
          - 회원가입을 마치지 못한 바른번역 소속 번역가님은 바른번역 메일 주소로
          문의주시기 바랍니다.
        </p>
      </div>
    </form>
  );
}
