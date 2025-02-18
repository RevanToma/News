'use client';
import Link from 'next/link';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from './ui/menubar';
import { ModeToggle } from './toggle-mode';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';
import { EllipsisVertical } from 'lucide-react';
import Search from './search';
import { categories } from '@/lib/constants';
import ProgressScroll from './progress-scroll';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-50 opacity-95'>
      <ProgressScroll />

      <Menubar className='p-4 w-full flex justify-between items-center py-4 h-fit border-none'>
        <nav className='md:hidden'>
          <Sheet>
            <SheetTrigger className='align-middle'>
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className='flex flex-col' side='left'>
              <div className='flex flex-col gap-5 '>
                <Link href='/'>
                  <Image
                    src='/chasnews-logo.svg'
                    alt='Chas News Logo'
                    width={150}
                    height={150}
                  />
                </Link>
                <SheetTitle className='border-b w-full'>Categories</SheetTitle>
              </div>
              {categories.map((category) => (
                <SheetTitle key={category}>
                  <Link
                    href={`/categories/${category}`}
                    className='flex items-center gap-2 py-2 capitalize'
                  >
                    {pathname === `/categories/${category}` && <span>🔸</span>}
                    {category}
                  </Link>
                </SheetTitle>
              ))}
              <ModeToggle />
            </SheetContent>
          </Sheet>
        </nav>
        <div className='flex items-center gap-4'>
          <Link
            href='/'
            className='hidden md:flex text-2xl font-bold text-primary '
          >
            <Image
              src='/chasnews-logo.svg'
              alt='Chas News Logo'
              width={150}
              height={150}
            />
          </Link>
        </div>
        <Search />
        <MenubarMenu>
          <div className='hidden lg:flex items-center pr-10 gap-3'>
            <MenubarTrigger
              className={`cursor-pointer px-4 py-2 rounded-md transition-all 
            ${pathname.startsWith('/categories') ? 'border-b-2' : ''}`}
            >
              Categories
            </MenubarTrigger>
            <MenubarContent>
              {categories.map((category) => (
                <MenubarItem key={category}>
                  <Link
                    href={`/categories/${category}`}
                    className='w-full flex gap-2 py-2 capitalize'
                  >
                    {pathname === `/categories/${category}` && <span>🔸</span>}
                    {category}
                  </Link>
                </MenubarItem>
              ))}
            </MenubarContent>

            <Link
              href='/bookmarks'
              className={`${
                pathname.includes('/bookmarks') ? 'border-b-2' : ''
              }`}
            >
              Bookmarks
            </Link>

            <ModeToggle />
          </div>
        </MenubarMenu>
      </Menubar>
    </header>
  );
}
