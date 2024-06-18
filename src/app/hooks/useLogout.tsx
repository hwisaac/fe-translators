import useIsStaff from '@/app/hooks/useIsStaff';
import useLocalToken from '@/app/hooks/useLocalToken';
import { useRouter } from 'next/navigation';

export default function useLogout() {
  const { removeIsStaff } = useIsStaff();
  const { removeToken } = useLocalToken();
  const router = useRouter();
  const logout = () => {
    removeIsStaff();
    removeToken;
    router.push('/member/login');
  };
  return logout;
}
