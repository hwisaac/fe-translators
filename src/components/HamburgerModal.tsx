import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  openHamburger: boolean;
  closeModal: () => void;
};

export default function HamburgerModal({ openHamburger, closeModal }: Props) {
  const router = useRouter();
  if (!openHamburger) return null;

  const handleRoute = (url: string) => {
    router.push(url);
    closeModal();
  };

  return (
    <div className='w-full h-screen  bg-slate-50 shadow '>
      <div className='border-b p-4'>
        <h3
          className='text-xl cursor-pointer'
          onClick={() => handleRoute('/introduction/history')}>
          바른번역 소개
        </h3>
        <ul className='mt-2 px-3 flex flex-col gap-2'>
          <li
            className=' cursor-pointer hover:text-blue-500'
            onClick={() => handleRoute('/introduction/history')}>
            설립취지&역사
          </li>
          <li
            className=' cursor-pointer hover:text-blue-500'
            onClick={() => handleRoute('/introduction/difference')}>
            바른번역이 좋은 이유
          </li>
          <li
            className=' cursor-pointer hover:text-blue-500'
            onClick={() => handleRoute('/introduction/partnership')}>
            바른번역이 원하는 파트너십
          </li>
          <li
            className=' cursor-pointer hover:text-blue-500'
            onClick={() => handleRoute('/introduction/location')}>
            연락처 및 약도
          </li>
        </ul>
      </div>
      <div className='border-b p-4'>
        <h3
          className='text-xl cursor-pointer'
          onClick={() => handleRoute('/request/process')}>
          번역 의뢰
        </h3>
        <ul className='mt-2 px-3 flex flex-col gap-2'>
          <li
            className=' cursor-pointer hover:text-blue-500'
            onClick={() => handleRoute('/request/process')}>
            의뢰 프로세스
          </li>
          <li
            className=' cursor-pointer hover:text-blue-500'
            onClick={() => handleRoute('/request/qna')}>
            Q&A
          </li>
        </ul>
      </div>
      <div
        className='border-b p-4 cursor-pointer'
        onClick={() => handleRoute('/new-books')}>
        <h3 className='text-xl'>신간 안내</h3>
      </div>
      <div
        className='border-b p-4 cursor-pointer'
        onClick={() => handleRoute('/translators')}>
        <h3 className='text-xl'>번역가 소개 안내</h3>
      </div>
      <div
        className='p-4 cursor-pointer'
        onClick={() => handleRoute('/participation-guide')}>
        <h3 className='text-xl'>번역가 참여안내</h3>
      </div>
    </div>
  );
}
