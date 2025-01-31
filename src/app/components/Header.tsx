import { AppBar } from '@mui/material'
import DesktopMenu from './Menu/Desktop';
import MobileMenu from './Menu/Mobile';

export type PageLinks = { title: string; href: string }[]

// наше приложение состоит из 5 страниц:
// Landing, Profile, Login, Home(Search) и Registration
const PAGE_LINKS = [
  { title: 'Главная', href: '/' },
  { title: 'Профиль', href: '/index.tsx' },
]

export default function Header() {
  return (
    <div className="bg-transparent shadow-none mb-6">
      <div className="flex items-center justify-between w-full p-4">
        <DesktopMenu links={PAGE_LINKS} />
        <MobileMenu links={PAGE_LINKS} />
      </div>
    </div>
  );
}
 