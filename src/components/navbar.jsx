'use client'
import React from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { CartSheet } from './cart/sheet';
import { SearchInput } from '@/components/search/searchInput';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

export default function Navbar() {
  const router = useRouter();

  const handleSearch = (keyword) => {
    if (keyword && keyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <nav className="bg-slate-900">
      <div className="mx-auto w-full max-w-7xl py-4 space-y-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Librería Creativa
          </Link>
          <div className="flex-1 max-w-2xl">
            <SearchInput onSearch={handleSearch} />
          </div>

          <div className="flex items-center">
            <CartSheet />
          </div>
        </div>
        <div>
          <ul className={`${inter.className} flex w-full justify-left gap-10 text-sm font-light text-white`}>
            <li><Link href="/books" className="hover:text-orange-400">Libros</Link></li>
            <li><Link href="/albums" className="hover:text-orange-400">Música</Link></li>
            <li><Link href="/boardgames" className="hover:text-orange-400">Juegos de mesa</Link></li>
            <li><Link href="/" className="hover:text-orange-400">Contacto</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
