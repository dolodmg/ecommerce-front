import React from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: '400' });

export default function CategoryCard({ name, imageUrl, link }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center p-4 rounded-full hover:scale-105 bg-slate-300 w-48 h-48">
                <img src={imageUrl} alt={name} className="px-2"/>
            </div>
            <Link href={link} className={`${inter.className} mt-2 text-center text-sm text-slate-900`}>
          {name}
        </Link>
        </div>
    )
}