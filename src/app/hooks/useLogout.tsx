import { useAuthStore } from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';

export default function useLogout() {
  const { removeLoginState } = useAuthStore();

  const router = useRouter();
  const logout = () => {
    removeLoginState();
    router.push('/member/login');
  };
  return logout;
}
