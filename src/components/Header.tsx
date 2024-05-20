'use client';
import { FaPenNib } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/barun-blue-logo.png';
import Link from 'next/link';
import LogoutBtn from '@/components/LogoutBtn';
import { GiHamburgerMenu } from 'react-icons/gi';
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
  const [openMenu, setOpenMenu] = useState(true);
  const [subMenu, setSubMenu] = useState<any[]>(subMenus.intro);
  const [openHamburger, setOpenHamburger] = useState(false);

  const handleOpenMenu = (submenu: any[]) => {
    setOpenMenu(true);
    setSubMenu([...submenu]);
  };
  const onHamburger = () => {
    setOpenHamburger((prev) => !prev);
  };

  return (
    <>
      <div
        className='hidden lg:flex flex-col fixed top-0 w-full z-50'
        // onMouseLeave={() => setOpenMenu(false)}
      >
        <section className='w-full bg-white text-slate-900 py-3 border-b'>
          <div className='w-full max-w-6xl flex justify-between mx-auto items-center'>
            <div>
              <Link href='/'>
                <Image alt='barun-translation-logo' src={logo} />
              </Link>
            </div>
            <div className='flex gap-10'>
              <ul className='flex items-center gap-10'>
                <li
                  className='hover:text-blue-400 cursor-pointer'
                  onMouseEnter={() => handleOpenMenu(subMenus.intro)}>
                  바른번역 소개
                </li>
                <li
                  className='hover:text-blue-400 cursor-pointer'
                  onMouseEnter={() => handleOpenMenu(subMenus.request)}>
                  번역 의뢰
                </li>
                <Link href='/new-books'>
                  <li className='hover:text-blue-400 cursor-pointer'>
                    신간 안내
                  </li>
                </Link>
                <Link href='/translators'>
                  <li className='hover:text-blue-400 cursor-pointer'>
                    번역가 소개
                  </li>
                </Link>
                <Link href='/participation-guide'>
                  <li className='hover:text-blue-400 cursor-pointer'>
                    번역가 참여 안내
                  </li>
                </Link>
              </ul>
              <LogoutBtn />
              <Link href='/member'>
                <button className='border border-white text-white bg-black  rounded-full flex items-center gap-3 px-6 py-3 xs:text-red-500'>
                  <FaPenNib className='hidden lg:inline' />
                  번역가방
                </button>
              </Link>
            </div>
          </div>
        </section>
        {openMenu && (
          <section className='w-full flex bg-slate-50 text-slate-400 h-[60px] items-center'>
            <ul className='max-w-6xl w-full flex mx-auto space-x-10 justify-center'>
              {subMenu.map((menu) => (
                <Link key={menu.href} href={menu.href}>
                  <li className='hover:text-blue-400 cursor-pointer'>
                    {menu.text}
                  </li>
                </Link>
              ))}
            </ul>
          </section>
        )}
      </div>
      <div className='lg:hidden fixed top-0 w-full z-10 bg-white '>
        <div className='flex justify-between items-center w-full px-2 py-4'>
          <Link href='/'>
            <Image alt='barun-translation-logo' src={logo} />
          </Link>
          <div className='flex items-center gap-10'>
            <LogoutBtn />
            <Link
              href='/member'
              className='font-semibold bg-black rounded-full text-white flex items-center justify-center py-2 w-[100px] text-xs lg:text-md'>
              번역가방
            </Link>
            <GiHamburgerMenu
              size={25}
              onClick={onHamburger}
              className=' cursor-pointer'
            />
          </div>
        </div>
        {openHamburger && (
          <div className='w-full h-full grid grid-cols-2 p-4 bg-slate-50 shadow py-[50px]'>
            <div>
              <div>
                <h3 className='text-slate-500'>바른번역 소개</h3>
                <ul className='flex flex-col'>
                  <Link
                    href='/introduction/history'
                    className='pl-4 font-semibold text-slate-700 hover:bg-slate-200'>
                    설립취지&역사
                  </Link>
                  <Link
                    href='/introduction/difference'
                    className='pl-4 font-semibold text-slate-700 hover:bg-slate-200'>
                    바른번역이 좋은 이유
                  </Link>
                  <Link
                    href='/introduction/partnership'
                    className='pl-4 font-semibold text-slate-700 hover:bg-slate-200'>
                    바른번역이 원하는 파트너십
                  </Link>
                  <Link
                    href='/introduction/location'
                    className='pl-4 font-semibold text-slate-700 hover:bg-slate-200'>
                    연락처 및 약도
                  </Link>
                </ul>
              </div>
              <div>
                <h3 className='text-slate-500 mt-4'>번역 의뢰</h3>
                <ul className='flex flex-col'>
                  <Link
                    href='/request/process'
                    className='pl-4 font-semibold text-slate-700 hover:bg-slate-200'>
                    의뢰 프로세스
                  </Link>
                  <Link
                    href='/request/qna'
                    className='pl-4 font-semibold text-slate-700 hover:bg-slate-200'>
                    Q&A
                  </Link>
                </ul>
              </div>
            </div>
            <div className='w-full'>
              <ul className='flex flex-col'>
                <Link
                  href='/new-books'
                  className='pl-4 font-semibold text-slate-700 hover:bg-slate-200'>
                  신간 안내
                </Link>
                <Link
                  href='/translators'
                  className='pl-4 font-semibold text-slate-700 hover:bg-slate-200'>
                  번역가 소개
                </Link>
                <Link
                  href='/participation-guide'
                  className='pl-4 font-semibold text-slate-700 hover:bg-slate-200'>
                  번역가 참여 안내
                </Link>
              </ul>
              <div className='w-full'></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
