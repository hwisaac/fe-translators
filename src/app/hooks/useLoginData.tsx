import { loginAtom } from '@/atoms/loginAtom';
import { useRecoilValue } from 'recoil';

type Props = {};

export default function useLoginData() {
  const loginData = useRecoilValue(loginAtom);
  return loginData;
}
