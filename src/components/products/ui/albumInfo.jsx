'use client'
import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function AlbumInfo({ product })  {
    return (
        <div>
            <div className="flex flex-row gap-1 mt-2">
                <p className="text-sm font-medium text-zinc-600">Formato:</p>
                <p className="text-sm font-light text-zinc-600">
                {product.albumFormat === "CD" ? (
                  "CD"
                ) : product.albumFormat === "VINYL" ? (
                  "VINILO"
                ) : null}
                </p>
            </div>
            <div className="flex flex-row gap-1 mt-2">
                <p className="text-sm font-medium text-zinc-600">Fecha de publicación:</p>
                <p className="text-sm font-light text-zinc-600">{product.publicationDate}</p>
            </div>
        </div>
    )
}