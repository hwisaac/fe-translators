'use client';
import { FaPenNib } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/barun-blue-logo.png';
import Link from 'next/link';
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
      text: '공지사항',
      href: '/introduction/notice',
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
  const [openMenu, setOpenMenu] = useState(false);
  const [subMenu, setSubMenu] = useState<any[]>([]);

  // const toggleMenu = () => {
  //   setOpenMenu((pre) => !pre);
  // };
  const handleOpenMenu = (submenu: any[]) => {
    setOpenMenu(true);
    setSubMenu([...submenu]);
  };

  return (
    <div
      className='fixed top-0 w-full z-50'
      onMouseLeave={() => setOpenMenu(false)}>
      <section className='w-full bg-white text-slate-900 py-3 border-b'>
        <div className='w-full max-w-6xl flex justify-between mx-auto items-center'>
          <div>
            <Image alt='barun-translation-logo' src={logo} />
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
              <li className='hover:text-blue-400 cursor-pointer'>신간 안내</li>
              <li className='hover:text-blue-400 cursor-pointer'>
                번역가 소개
              </li>
              <li className='hover:text-blue-400 cursor-pointer'>
                번역가 참여 안내
              </li>
            </ul>
            <button className='border border-white text-white bg-black  rounded-full flex items-center gap-3 px-6 py-3'>
              <FaPenNib />
              번역가방
            </button>
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
  );
}
