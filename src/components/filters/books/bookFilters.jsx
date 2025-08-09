'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PriceFilter from '@/components/filters/priceFilter';
import FilterButton from '@/components/filters/filterButton';
import BookGenreFilter from './bookGenreFilter';

const BookFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    const handleFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', 'BOOKS');
    if (minPrice !== '') {
      params.set('minPrice', Number(minPrice));
    } else {
      params.delete('minPrice');
    }
    if (maxPrice !== '') {
      params.set('maxPrice', Number(maxPrice));
    } else {
      params.delete('maxPrice');
    }
    router.push(`/books?${params.toString()}`);
  };

    return (
        <div className="flex flex-col gap-2 items-start justify-self-start w-full">
            <BookGenreFilter />
            <div className='flex flex-col'>
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
              />
              <FilterButton onClick={handleFilters} />
            </div>
        </div>
    );
};

export default BookFilters;
