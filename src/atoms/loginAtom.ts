import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export type LoginDataType = {
  email: string;
  id: number;
  photo: null | string;
  token: string;
  username: string;
  is_staff: boolean;
  is_translator: boolean;
};
const { persistAtom } = recoilPersist();

export const loginAtom = atom<LoginDataType | null>({
  key: 'loginAtom',
  default: null,
  // effects_UNSTABLE: [persistAtom],
});
