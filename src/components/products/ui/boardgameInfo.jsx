'use client'
import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function BoardgameInfo({ product }) {
    return (
        <div className={`${roboto.className} flex flex-row gap-1 mt-2`}>
            <p className="text-sm font-medium text-zinc-600">Marca:</p>
            <p className="text-sm font-light text-zinc-600">{product.brand}</p>
        </div>
    );
}