'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PriceFilter from '@/components/filters/ui/priceFilter';
import FilterButton from '@/components/filters/ui/filterButton';
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
        <div className="flex flex-col items-center justify-center mt-4">
            <BookGenreFilter />
            <div className='flex flex-col items-start justify-self-start w-full ml-2 mt-4'>
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
