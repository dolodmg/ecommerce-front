'use client';
import React from 'react';
import { Input } from '@/components//ui/input';
import { Roboto } from "next/font/google";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function PriceFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
    return (
        <div>
            <p className={`${roboto.className} text-xs font-medium text-zinc-700`}>
            PRECIO
            </p>
            <div className="flex flex-row gap-2">
                <Input
                    type="text"
                    id="min-price"
                    min="0"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="Mínimo"
                    value={minPrice}
                    className="w-1/3"
                    onChange={(e) => {
                        const validated = e.target.value.replace(/[^0-9]/g, '');
                        setMinPrice(validated);
                    }}
                />
                <Input
                    type="text"
                    id="max-price"
                    min="0"
                    pattern="[0-9]*"
                    value={maxPrice}
                    inputMode="numeric"
                    placeholder="Máximo"
                    className="w-1/3"
                    onChange={(e) => {
                        const validated = e.target.value.replace(/\D/g, '');
                        setMaxPrice(validated);
                    }}
                />
            </div>
        </div>
    );
}