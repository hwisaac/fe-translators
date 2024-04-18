import { atom } from 'recoil';

export const testAtom = atom({
  key: 'testAtom',
  default: {
    id: null as string | null,
    name: '안녕 나 맄오리' as string | null,
  },
});
