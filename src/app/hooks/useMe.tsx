import useLogout from '@/app/hooks/useLogout';
import BASE_URL from '@/utils/BASE_URL';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

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
  const { loginState } = useAuthStore();
  const logout = useLogout();
  return useQuery({
    queryKey: ['me', loginState?.token ?? ''],
    queryFn: () =>
      fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          Authorization: loginState?.token ?? '',
        },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
          logout();
        }),
  });
  return useQuery({
    queryKey: ['me', loginState?.token ?? ''],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: loginState?.token ?? '',
          },
        })
        .then((res) => {
          console.log('useMe 에 사용된 토큰', loginState?.token);
          console.log('useMe 응답데이터', res.data);
          return res.data as MeType;
        })
        .catch((err: AxiosError) => {
          console.error(err);
          logout();
          // if (err.response?.status === 403) {
          //   toast.error('Forbidden');
          // }
        }),
    staleTime: 0,
  });
}
