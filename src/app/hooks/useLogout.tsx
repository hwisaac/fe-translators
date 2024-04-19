import { loginAtom } from '@/atoms/loginAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function useLogout() {
  const setLoginState = useSetRecoilState(loginAtom);
  const logout = () => setLoginState(null);
  return logout;
}
