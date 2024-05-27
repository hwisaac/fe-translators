import Logo from '@/components/Logo';
import BASE_URL from '@/utils/BASE_URL';

type Props = {};

export default async function Footer({}: Props) {
  const barun = await fetch(`${BASE_URL}/barun/`)
    .then((res) => res.json())
    .catch(console.error);

  return (
    <section className='w-full bg-stone-800 pt-10 pb-16 px-2'>
      <div className='w-full max-w-6xl mx-auto space-y-10'>
        <Logo />
        <div className='text-stone-500 text-xs sm:text-lg'>
          <ul>
            <li>
              {barun?.barun_address ||
                '서울시 마포구 어울마당로 26 제일빌딩 5층 (당인동 12-1)'}
              / 문의 {barun?.barun_phone || '02-338-2180'} / 팩스
              {barun?.barun_fax || '02-338-2146'}
            </li>
            <li>번역문의 {barun?.barun_email || 'book@barunmc.com'}</li>
          </ul>
          <p>COPYRIGHT © 2018 BARUN MEDIA CO. LTD. ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </section>
  );
}
