'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PriceFilter from '@/components/filters/ui/priceFilter';
import FilterButton from '@/components/filters/ui/filterButton';
import AlbumFormatFilter from './albumFormatFilter';
import AlbumGenreFilter from './albumGenreFilter';

const AlbumFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    const handleFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', 'MUSIC');
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
    router.push(`/albums?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <AlbumFormatFilter />
      <AlbumGenreFilter />
      <div className='flex flex-col items-start justify-self-start w-full'>
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

export default AlbumFilters;
