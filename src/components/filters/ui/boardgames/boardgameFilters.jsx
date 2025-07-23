'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PriceFilter from '@/components/filters/ui/priceFilter';
import FilterButton from '@/components/filters/ui/filterButton';

const BoardgameFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    const handleFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', 'BOARDGAMES');
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
    router.push(`/boardgames?${params.toString()}`);
  };

    return (
        <div className='flex flex-col'>
            <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            />
            <FilterButton onClick={handleFilters} />
        </div>
    );
};

export default BoardgameFilters;
