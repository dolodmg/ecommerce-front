import React from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export default function CategoryCard({ name, imageUrl, link }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center p-4 rounded-full hover:scale-105 border border-lime-900 w-48 h-48">
                <img src={imageUrl} alt={name} className="px-2"/>
            </div>
            <Link href={link} className={`${inter.className} mt-2 text-center font-bold text-sm text-green-900`}>
          {name}
        </Link>
        </div>
    )
}