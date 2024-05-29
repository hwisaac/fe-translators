'use client';
import { IoLogOutSharp } from 'react-icons/io5';
import { loginAtom } from '@/atoms/loginAtom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

type Props = {};

export default function LogoutBtn({}: Props) {
  const [show, setShow] = useState(false);
  const [loginState, setLoginState] = useRecoilState(loginAtom);
  const router = useRouter();
  useEffect(() => {
    // 로그인 상태가 null이 아닌 경우에만 버튼을 보여주도록 설정
    setShow(loginState !== null);
  }, [loginState]); // loginState가 변경될 때마다 useEffect를 실행

  const handleClick = () => {
    console.log(loginState);
    setLoginState(null); // 로그아웃 처리
    router.push('/');
  };

  if (!show) return null; // show가 false면 null 반환, 버튼 숨김
  return (
    <button
      className={`text-white rounded-full flex items-center gap-3 px-4 lg:px-6 py-2 lg:py-3 xs:text-red-500 box-border text-xs lg:text-md ${
        loginState?.is_staff ? 'bg-red-500 ' : 'bg-blue-500 '
      }`}
      onClick={handleClick}>
      <IoLogOutSharp className='lg:text-[18px]' />
      <span className='hidden sm:inline lg:text-[16px]'>
        로그아웃
        {/* ({`${loginState?.username}`}) */}
      </span>
    </button>
  );
}
