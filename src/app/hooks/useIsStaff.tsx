import { useEffect, useState } from 'react';
import { boolean } from 'zod';

type Props = {};

export default function useIsStaff() {
  const [isStaff, setIsStaff] = useState<boolean | null>(false);
  useEffect(() => {
    const is_staff = localStorage.getItem('is_staff');
    if (is_staff === null) {
      setIsStaff(null);
    } else {
      setIsStaff(is_staff === 'true');
    }
  }, []);

  // 토큰을 저장하는 함수
  const saveIsStaff = (is_staff: string | boolean) => {
    localStorage.setItem('is_staff', String(is_staff));
    if (typeof is_staff === 'string') {
    }
    setIsStaff(is_staff === 'true');
  };

  // 토큰을 삭제하는 함수
  const removeIsStaff = () => {
    localStorage.removeItem('is_staff');
    setIsStaff(null);
  };

  return {
    saveIsStaff,
    removeIsStaff,
    isStaff,
  };
}
