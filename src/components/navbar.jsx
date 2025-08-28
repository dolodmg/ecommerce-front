'use client'
import React from 'react';
import Link from 'next/link';
import { Inter, Monofett } from 'next/font/google';
import { CartSheet } from './cart/sheet';
import { SearchInput } from '@/components/search/searchInput';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const monofett = Monofett({ subsets: ['latin'], weight: ['400'] });

export default function Navbar() {
  const router = useRouter();

  const handleSearch = (keyword) => {
    if (keyword && keyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <nav className="bg-green-900">
      <div className="mx-auto w-full max-w-7xl py-4 space-y-4">
        <div className="flex items-center justify-between">
          <Link href="/" className={`${monofett.className} text-6xl font-normal text-pink-300`}>
            nexo
          </Link>
          <div className="flex-1 max-w-2xl">
            <SearchInput onSearch={handleSearch} />
          </div>

          <div className="flex items-center">
            <CartSheet />
          </div>
        </div>
        <div>
          <ul className={`${inter.className} flex w-full justify-left gap-14 text-sm font-light text-white`}>
            <li><Link href="/books" className="hover:text-pink-300">Libros</Link></li>
            <li><Link href="/albums" className="hover:text-pink-300">Música</Link></li>
            <li><Link href="/boardgames" className="hover:text-pink-300">Juegos de mesa</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
