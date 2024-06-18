'use client';

import { useAuthStore } from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';
import React from 'react';
type Props = {
  children: React.ReactNode;
};

export default function AdminProtectPageLayout({ children }: Props) {
  const { loginState } = useAuthStore();
  const router = useRouter();
  React.useEffect(() => {
    // 로그인 상태가 확인된 후, staff가 아닐 경우 리다이렉트
    if (!loginState) {
      router.push('/unauthorized'); // 권한 없음 페이지 또는 로그인 페이지로 리다이렉트
    }
  }, [loginState, router]);

  // staff 권한을 가진 사용자만 내용을 볼 수 있음
  if (loginState?.user?.is_staff) {
    return <div>{children}</div>;
  } else {
    return <div>권한이 없습니다.</div>; // 이 코드는 useEffect에 의해 리다이렉트 되므로 실제로 실행될 일은 거의 없음
  }
}
