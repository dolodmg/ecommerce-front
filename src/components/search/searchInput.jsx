'use client'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { Roboto } from 'next/font/google';

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export const SearchInput = ({onSearch}) => {
    const [value, setValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);
    };
    return (
        <form onSubmit={handleSubmit} className='flex flex-row items-center w-full max-w-lg bg-white'>
            <Input 
            type="text" 
            placeholder="Buscá por título, autor, artista, palabra clave o ISBN"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`${roboto.className} h-10 text-zinc-600 font-light rounded-none border-none focus:outline-4`}
            />
            <button type="submit" className='cursor-pointer h-10 px-2 flex items-center justify-center'>
                <SearchIcon size={22} className='text-pink-400'/>
            </button>
        </form>
    )
}

export default SearchInput;