import { loginAtom } from '@/atoms/loginAtom';
import { useRouter } from 'next/navigation';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function useLogout() {
  const setLoginState = useSetRecoilState(loginAtom);
  const router = useRouter();
  const logout = () => {
    setLoginState(null);
    router.push('/member/login');
  };
  return logout;
}
