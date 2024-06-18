'use client';
import { FaPenNib } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/barun-blue-logo.png';
import Link from 'next/link';
import LogoutBtn from '@/components/LogoutBtn';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useRouter } from 'next/navigation';
import HamburgerModal from '@/components/HamburgerModal';
import { useAuthStore } from '@/zustand/useAuthStore';
import { isDev } from '@/utils/commons';
type Props = {};

const subMenus = {
  intro: [
    {
      text: '설립취지&역사',
      href: '/introduction/history',
    },
    {
      text: '바른번역이 좋은 이유',
      href: '/introduction/difference',
    },
    {
      text: '바른번역이 원하는 파트너십',
      href: '/introduction/partnership',
    },
    {
      text: '연락처 및 약도',
      href: '/introduction/location',
    },
  ],
  request: [
    {
      text: '의뢰 프로세스',
      href: '/request/process',
    },
    {
      text: 'Q&A',
      href: '/request/qna',
    },
  ],
};
export default function Header({}: Props) {
  const devLoginState = useAuthStore((state) => state.loginState);
  const [subMenu, setSubMenu] = useState<any[]>(subMenus.intro);
  const [openHamburger, setOpenHamburger] = useState(false);
  const router = useRouter();
  const handleOpenMenu = (submenu: any[]) => {
    setSubMenu([...submenu]);
  };
  const onHamburger = () => {
    setOpenHamburger((prev) => !prev);
  };
  const closeModal = () => {
    setOpenHamburger(false);
  };
  const onDev = () => {
    console.log('onDev(devLoginState)', devLoginState);
  };

  return (
    <>
      <div className='hidden lg:flex flex-col fixed top-0 w-full z-50'>
        <section className='w-full bg-white text-slate-900 py-3 border-b h-[70px]'>
          <div className='w-full max-w-6xl flex justify-between mx-auto items-center'>
            <div>
              <Link href='/'>
                <Image alt='barun-translation-logo' src={logo} />
              </Link>
            </div>
            <div className='flex gap-10'>
              <ul className='flex items-center gap-10'>
                <Link href='/introduction/history'>
                  <li
                    className='hover:text-blue-400 cursor-pointer transition-colors'
                    onMouseEnter={() => handleOpenMenu(subMenus.intro)}>
                    바른번역 소개
                  </li>
                </Link>
                <Link href='/request/process'>
                  <li
                    className='hover:text-blue-400 cursor-pointer transition-colors'
                    onMouseEnter={() => handleOpenMenu(subMenus.request)}>
                    번역 의뢰
                  </li>
                </Link>
                <Link href='/new-books'>
                  <li className='hover:text-blue-400 cursor-pointer transition-colors'>
                    신간 안내
                  </li>
                </Link>
                <Link href='/translators'>
                  <li className='hover:text-blue-400 cursor-pointer transition-colors'>
                    번역가 소개
                  </li>
                </Link>
                <Link href='/participation-guide'>
                  <li className='hover:text-blue-400 cursor-pointer transition-colors'>
                    번역가 참여 안내
                  </li>
                </Link>
              </ul>
              <div className='flex gap-2'>
                <LogoutBtn closeModal={closeModal} />
                <Link href='/member'>
                  <button className='text-white bg-black  rounded-full flex items-center gap-3 px-6 py-3 xs:text-red-500 box-border'>
                    <FaPenNib />
                    번역가방
                  </button>
                </Link>
              </div>
              {isDev && (
                <div className='btn' onClick={onDev}>
                  DEV
                </div>
              )}
            </div>
          </div>
        </section>

        <section className='w-full flex bg-slate-50 text-slate-400 h-[60px] items-center'>
          <ul className='max-w-6xl w-full flex mx-auto space-x-10 justify-center'>
            {subMenu.map((menu) => (
              <Link key={menu.href} href={menu.href}>
                <li className='hover:text-blue-400 cursor-pointer transition-colors'>
                  {menu.text}
                </li>
              </Link>
            ))}
          </ul>
        </section>
      </div>

      {/* 반응형 */}
      <div className='lg:hidden fixed top-0 w-full z-10 bg-white '>
        <div className='flex justify-between items-center w-full px-2 py-4'>
          <Link href='/'>
            <Image
              alt='barun-translation-logo'
              src={logo}
              className=' scale-75'
            />
          </Link>
          <div className='flex items-center gap-2 sm:gap-5'>
            <LogoutBtn closeModal={closeModal} />
            <button
              onClick={() => {
                router.push('/member');
                closeModal();
              }}
              className='font-semibold bg-black rounded-full text-white flex items-center justify-center py-2 px-4 sm:w-[100px] text-xs lg:text-md gap-3 cursor-pointer'>
              <FaPenNib />
              <span className='hidden sm:inline lg:text-[16px]'>번역가방</span>
            </button>
            <GiHamburgerMenu
              size={25}
              onClick={onHamburger}
              className=' cursor-pointer shrink-0'
            />
          </div>
        </div>
        <HamburgerModal openHamburger={openHamburger} closeModal={closeModal} />
      </div>
    </>
  );
}
