import Logo from '@/components/Logo';

type Props = {};

export default function Footer({}: Props) {
  return (
    <section className='w-full bg-stone-800 pt-10 pb-16'>
      <div className='w-full max-w-6xl mx-auto space-y-10'>
        <Logo />
        <div className='text-stone-500'>
          <ul>
            <li>
              서울시 마포구 어울마당로 26 제일빌딩 5층 (당인동 12-1) / 문의
              02-338-2180 / 팩스 02-338-2146
            </li>
            <li>번역문의 book@barunmc.com</li>
          </ul>
          <p>COPYRIGHT © 2018 BARUN MEDIA CO. LTD. ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </section>
  );
}
