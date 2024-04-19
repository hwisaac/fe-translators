import { loginAtom } from '@/atoms/loginAtom';
import { useRecoilValue } from 'recoil';

type Props = {};

export default function useToken() {
  const loginState = useRecoilValue(loginAtom);
  return loginState?.token || '';
}
