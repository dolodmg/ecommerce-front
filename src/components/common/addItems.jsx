'use client'
import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const AddItems = ({ quantity = 1, onAdd, onRemove }) => {
  return (
    <div className={`${roboto.className} flex items-center justify-between bg-slate-100 border border-slate-300 rounded-full px-3 py-1 font-normal`}>
      <button onClick={onRemove} className="px-3 py-1 text-lg hover:bg-slate-700 hover:text-white rounded-full transition">
        —
      </button>
      <span className="mx-2 text-md">{quantity}</span>
      <button onClick={onAdd} className="px-3.5 py-1 text-lg hover:bg-slate-700 hover:text-white rounded-full transition">
        +
      </button>
    </div>
  );
}

export default AddItems;