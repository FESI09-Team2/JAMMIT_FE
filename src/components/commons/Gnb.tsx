'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DefaultProfileImage from '@/assets/icons/ic_default_profile.svg';

export default function Gnb() {
  const pathname = usePathname();

  const isLoggedIn = true;

  return (
    <header className="flex h-[3.75rem] w-full items-center justify-center bg-black px-[1.75rem]">
      <div className="flex w-full max-w-[74.875rem] items-center justify-between text-white">
        <nav className="flex gap-[1.5rem]">
          <Link
            href="/"
            data-active={pathname === '/'}
            className="opacity-80 data-[active=true]:opacity-100"
          >
            JAMMIT
          </Link>
          <Link
            href="/"
            data-active={pathname === '/'}
            className="opacity-80 data-[active=true]:opacity-100"
          >
            모임 찾기
          </Link>
          <Link
            href="/wishlist"
            data-active={pathname === '/wishlist'}
            className="opacity-80 data-[active=true]:opacity-100"
          >
            찜한 모임
          </Link>
        </nav>
        <div>
          {isLoggedIn ? (
            <div className="relative h-[2.5rem] w-[2.5rem]">
              <DefaultProfileImage />
            </div>
          ) : (
            <Link
              data-active={pathname === '/login'}
              className="opacity-80 data-[active=true]:opacity-100"
              href="/login"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
