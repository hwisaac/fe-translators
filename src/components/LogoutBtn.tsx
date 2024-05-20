'use client';
import { IoLogOutOutline } from 'react-icons/io5';
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
    <div
      className={`btn btn-sm my-auto mx-2 ${
        loginState === null ? 'hidden' : ''
      } ${loginState?.is_staff ? 'btn-outline btn-primary' : ''}`}
      onClick={handleClick}>
      <IoLogOutOutline />
      <span className='hidden sm:inline'>
        로그아웃({`${loginState?.username}`})
      </span>
    </div>
  );
}
