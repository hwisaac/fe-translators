import useLogout from '@/app/hooks/useLogout';
import BASE_URL from '@/utils/BASE_URL';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';

type Props = {};
type MeType = {
  id: number;
  available_languages: string[];
  available_specializations: string[];
  available_styles: string[];
  languages: number[];
  specializations: number[];
  styles: number[];
  interviews: {
    question: string;
    answer: string;
    question_id: number;
    id: number;
  }[];
  username: string;
  is_staff: boolean;
  name: string;
  is_subscribed: boolean;
  subscribed: 'email' | 'kakao' | 'none';
  is_translator: boolean;
  is_public: boolean;
  birth_date: string;
  email: string;
  is_domestic: boolean;
  phone: string;
  photo: string;
  gender: string;
  pen_name: string;
  kakao_id: string;
  major_works: string;
  biography: string;
  works: string;
  zonecode: string;
  address1: string;
  address2: string;
  company: string;
};
export default function useMe() {
  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useState(null);
  const { loginState } = useAuthStore();
  const logout = useLogout();

  useEffect(() => {
    if (loginState) {
      setIsLoading(true);
      fetch(`${BASE_URL}/users/me/`, {
        method: 'GET',
        headers: {
          Authorization: loginState.token,
        },
      })
        .then(async (res) => {
          const json = await res.json();
          console.log('useMe FETCH 의 response', json);
          setMe(json);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loginState]);

  return { me, isLoading };

  // const fetchMe = useCallback(async () => {
  //   console.log('useMe 호출! queryKey', [loginState?.token, 'me']);
  //   return fetch(`${BASE_URL}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: loginState?.token ?? '',
  //     },
  //   })
  //     .then(async (res) => {
  //       const json = await res.json();
  //       console.log('useMe 의 response', json);
  //       return json;
  //     })
  //     .catch((err) => {
  //       console.error('(useMe Error catch)', err);
  //       logout();
  //     });
  // }, [loginState?.token, logout]);

  // return useQuery({
  //   queryKey: [loginState?.token, 'me'],
  //   queryFn: fetchMe as () => Promise<undefined | MeType>,
  //   staleTime: 0,
  // });
}
