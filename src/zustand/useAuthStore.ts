import { LoginDataType } from '@/components/member/login/LoginForm';
import BASE_URL from '@/utils/BASE_URL';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상태 인터페이스 정의
interface AuthState {
  loginState: null | LoginDataType;
  updateLoginState: (newLoginState: any) => void;
  removeLoginState: () => void;
}

// Zustand 스토어 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loginState: null,
      updateLoginState: (newLoginState) => {
        console.log('updateLoginState: ', newLoginState);
        return set({ loginState: newLoginState });
      },
      removeLoginState: () => set({ loginState: null }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 키 이름
    }
  )
);
