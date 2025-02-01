"use client";

import DesktopMenu from './Menu/Desktop';
import NoneMenu from './Menu/NoneMenu';
import MobileMenu from './Menu/Mobile';
import { usePathname } from 'next/navigation';

export type PageLinks = { title: string; href: string }[];

// наше приложение состоит из 5 страниц:
// Landing, Profile, Login, Home(Search) и Registration
const PAGE_LINKS = [
  { title: 'Главная', href: '/home' },
  { title: 'Профиль', href: '/profile' },
];

export default function Header() {
  const pathname = usePathname();
  const showNoneMenu = pathname === '/' || pathname === '/login' || pathname === '/register';

  return (
    <div className="bg-transparent shadow-none mb-6">
      <div className="flex items-center justify-between w-full p-4">
      {!showNoneMenu && <DesktopMenu links={PAGE_LINKS} />}
      {!showNoneMenu && <MobileMenu links={PAGE_LINKS} />}
        {showNoneMenu && <NoneMenu />}
      </div>
    </div>
  );
}