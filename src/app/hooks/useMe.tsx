import useLogout from '@/app/hooks/useLogout';
import useToken from '@/app/hooks/useToken';
import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type Props = {};

export default function useMe() {
  const token = useToken();
  const logout = useLogout();
  const router = useRouter();
  return useQuery({
    queryKey: ['me', token],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data)
        .catch((err: AxiosError) => {
          if (err.response?.status === 403) {
            toast.error('Forbidden');
            logout();
            router.push('/member/login');
          }
        }),
    staleTime: 0,
  });
}
