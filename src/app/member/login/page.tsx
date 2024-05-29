import PageLayout from '@/layouts/PageLayout';
import Link from 'next/link';
import LoginForm from '@/components/member/login/LoginForm';
import AuthProtectPageLayout from '@/layouts/AuthProtectPageLayout';
import { isDev } from '@/utils/commons';

type Props = {};

export default function page({}: Props) {
  return (
    <PageLayout title='로그인'>
      <h2 className='text-lg sm:text-2xl border-b py-10 px-4 mt-[80px] lg:mt-0'>
        번역가방은 바른번역 회원님들만 입장 가능합니다.
      </h2>
      <LoginForm />
      <div className='max-w-lg mx-auto flex flex-col gap-5 pt-3'>
        <div className='flex gap-10 relative left-2 justify-center text-sm'>
          <Link href='/member/find-id'>아이디 찾기</Link>
          <Link href='/member/find-password'>비밀번호 찾기</Link>
          {isDev && (
            <Link href='/member/signup'>
              <div>회원 가입</div>
            </Link>
          )}
        </div>
        <div className='text-slate-500 text-sm sm:text-md font-thin my-5'>
          <p className='flex items-start gap-2'>
            - 신규 가입을 원하시는 분은 번역가 참여안내 메뉴를 참고해주세요
          </p>
          <p className='flex items-start gap-2'>
            - 회원가입을 마치지 못한 바른번역 소속 번역가님은 바른번역 메일
            주소로 문의주시기 바랍니다.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
