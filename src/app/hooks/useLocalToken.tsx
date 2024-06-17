import { useEffect, useState } from 'react';

type Props = {};

export default function useLocalToken() {
  // 토큰을 상태로 저장
  const [token, setToken] = useState<null | string>(null);
  // 컴포넌트 마운트 시 로컬 스토리지에서 토큰을 불러옴
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // 토큰을 저장하는 함수
  const saveToken = (userToken: string) => {
    localStorage.setItem('accessToken', userToken);
    setToken(userToken);
  };

  // 토큰을 삭제하는 함수
  const removeToken = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  return {
    setToken: saveToken,
    removeToken,
    token,
  };
}
