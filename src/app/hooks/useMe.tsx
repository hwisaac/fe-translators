import useLoginData from '@/app/hooks/useLoginData';
import useLogout from '@/app/hooks/useLogout';
import useToken from '@/app/hooks/useToken';
import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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
  const token = useToken(); // 폐기 로그인데이터의 토큰 사용하기
  const logout = useLogout();
  const loginData = useLoginData();

  return useQuery({
    queryKey: ['me', loginData?.token ?? ''],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: loginData?.token,
          },
        })
        .then((res) => {
          return res.data as MeType;
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 403) {
            toast.error('Forbidden');
            logout();
          }
        }),
    staleTime: 0,
  });
}
