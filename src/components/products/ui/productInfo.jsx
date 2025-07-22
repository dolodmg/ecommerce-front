'use client'
import React from "react";
import { Roboto } from "next/font/google";
import AlbumInfo from "./albumInfo";
import BookInfo from "./bookInfo";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function ProductInfo({ product }) {
    return (
        <div  className={`${roboto.className} flex flex-row gap-10`}>
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium" >{product.name}</h2>
            { product.category === "BOOKS" || product.category === "MUSIC" ? 
              <p className="text-md font-medium text-zinc-600">{product.person.firstName} {product.person.lastName}</p> 
              : null
            }
            <p className="text-xl font-light text-zinc-600">${product.price}</p>
            <hr className="w-full my-2" />
            <p className="text-sm font-light text-zinc-600">{product.description}</p>
            { 
              product.category === "MUSIC" ? <AlbumInfo product={product} /> :
              product.category === "BOOKS" ? <BookInfo product={product} /> : null 
            }
            <div className="flex flex-row gap-1 mt-2">
              <p className="text-sm font-medium text-zinc-600">Categoría:</p>
              <p className="text-sm font-light text-zinc-600">
                {product.category === "MUSIC" ? " Música" :
                product.category === "BOOKS" ? " Libros" :
                product.category === "BOARDGAMES" ? "Juegos de mesa"
                : "Otro"}
              </p>
            </div>
          </div>
        </div>
    );
}