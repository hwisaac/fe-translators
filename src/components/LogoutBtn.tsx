'use client';
import { IoLogOutSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useIsTranslator from '@/app/hooks/useIsTranslator';
import { useAuthStore } from '@/zustand/useAuthStore';

type Props = {
  closeModal: () => void;
};

export default function LogoutBtn({ closeModal }: Props) {
  const { loginState, removeLoginState } = useAuthStore();
  const [show, setShow] = useState(false);
  const { removeIsTranslator } = useIsTranslator();
  const router = useRouter();
  useEffect(() => {
    // 로그인 상태가 null이 아닌 경우에만 버튼을 보여주도록 설정
    console.log('LogoutBtn 에서 토큰이 갱신됨', loginState?.token);
    setShow(!!loginState);
  }, [loginState]); // loginState가 변경될 때마다 useEffect를 실행

  const handleClick = () => {
    // removeToken(); // 로그아웃 처리
    // removeIsStaff();
    removeIsTranslator();
    closeModal();

    removeLoginState(); // 로그아웃 처리
    router.push('/');
  };

  if (!show) return null; // show가 false면 null 반환, 버튼 숨김
  return (
    <button
      className={`text-white rounded-full flex items-center gap-3 px-4 lg:px-6 py-2 lg:py-3 xs:text-red-500 box-border text-xs lg:text-md ${
        loginState?.user?.is_staff ? 'bg-red-500 ' : 'bg-blue-500 '
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
