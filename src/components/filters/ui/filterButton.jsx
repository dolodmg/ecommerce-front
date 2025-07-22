'use client';
import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const FilterButton = ({ onClick }) => {
    return (
        <button 
        onClick={onClick}
        className={`${roboto.className} mt-2 text-sm font-light text-white bg-slate-700 hover:bg-slate-800 rounded-full px-3 py-1`}>
        Aplicar
        </button>
    );
}

export default FilterButton;