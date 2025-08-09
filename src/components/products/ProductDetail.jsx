'use client';
import React, { useState } from "react";
import { Roboto, Inter, Newsreader } from "next/font/google";
import AddItems from "@/components/products/ui/addItems";
import { albumFormatLabels, albumGenreLabels, bookGenreLabels } from "@/utils/enumLabels";
import ProductStockAlert from "@/components/products/ui/productStockAlert";
import Button from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useCartData } from "@/hooks/useCartData";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700'] });
const newsreader = Newsreader({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700'] });

const ProductDetail = ({ product, quantity, onAdd, onRemove }) => {
  const isBook = product.category === "BOOKS";
  const isMusic = product.category === "MUSIC";
  const isBoardgame = product.category === "BOARDGAMES";
   const [showAlert, setShowAlert] = useState(false);
  const { add } = useCart();
  const { getItemById } = useCartData();

  const handleAddToCart = async () => {
      // Obtener cantidad actual en el carrito
      const itemInCart = getItemById(product.idProduct);
      const currentQuantity = itemInCart ? itemInCart.quantity : 0;
      
      // Verificar si la cantidad total excedería el stock
      if (currentQuantity + quantity > product.stock) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }

      try {
        await add(product, quantity);
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Error al agregar al carrito");
      }
    }

  return (
    <div className={`${newsreader.className} max-w-4xl mx-auto p-6 md:p-10 my-8 w-full`}>
      {/* Layout principal */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagen */}
        <div className="flex-shrink-0 flex justify-center items-start w-80 h-80">
          <img
            src={product.image || "/images/tayalbum.png"}
            alt={product.name}
            className="w-70 h-80 object-cover"
          />
        </div>
        {/* Info principal */}
        <div className="flex-1 flex flex-col gap-1">
          <h1 className="text-sm md:text-3xl font-light text-zinc-800">{product.name}</h1>
          {(isBook || isMusic ) && (
            <p className="text-sm text-sky-900 font-normal">
              {isBook && <>{product.person?.firstName} {product.person?.lastName}</>}
              {isMusic && <>{product.person?.firstName} {product.person?.lastName}</>}
            </p>
          )}
          <p className={`${inter.className} text-2xl font-semibold text-slate-700`}>${product.price}</p>
          {/* Botones de cantidad y añadir al carrito */}
          <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
            <AddItems 
              quantity={quantity} 
              onAdd={onAdd}
              onRemove={onRemove}
              className="w-full"
            />
            <div className="relative flex flex-col items-center w-full">
              <Button onClick={handleAddToCart} text="AGREGAR AL CARRITO" className="py-3 px-6 mb-2 text-sm rounded-full text-white bg-slate-700 w-full" />
              {showAlert && (
                <div className="absolute top-full mt-2 w-full flex justify-center">
                  <ProductStockAlert description={null} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Descripción */}
      <div className="mt-8">
        <h2 className="text-2xl font-medium text-zinc-800 mb-2 italic">Descripción</h2>
        <p className={`${roboto.className} border-zinc-600 border p-4 text-zinc-800 leading-relaxed text-sm font-normal`}>{product.description}</p>
      </div>
      {/* Ficha técnica */}
      <div className="mt-8">
        <h2 className="text-2xl font-medium text-zinc-800 mb-2 border-zinc-600 border-b pb-2">Ficha técnica</h2>
        <div className={`${roboto.className} text-sm text-zinc-800 font-normal gap-y-2`}>
          {isBook && (
            <>
              <div className="flex flex-row justify-between items-center py-1 border-b border-zinc-100">
                <span>Editorial:</span>
                <span>{product.editorialName}</span>
              </div>
              <div className="flex flex-row justify-between items-center py-1 border-b border-zinc-100">
                <span>Género:</span>
                <span>{bookGenreLabels[product.genre] || product.genre}</span>
              </div>
              <div className="flex flex-row justify-between items-center py-1 border-b border-zinc-100">
                <span>Fecha de publicación:</span>
                <span>{product.publicationDate}</span>
              </div>
              <div className="flex flex-row justify-between items-center py-1 border-b border-zinc-100">
                <span>ISBN:</span>
                <span>{product.isbn}</span>
              </div>
            </>
          )}
          {isMusic && (
            <>
              <div className="flex flex-row justify-between py-1 border-b border-zinc-100">
                <span>Género musical:</span>
                <span>{albumGenreLabels[product.albumGenre] || product.albumGenre}</span>
              </div>
              <div className="flex flex-row justify-between py-1 border-b border-zinc-100">
                <span>Formato:</span>
                <span>{albumFormatLabels[product.albumFormat] || product.albumFormat}</span>
              </div>
              <div className="flex flex-row justify-between py-1 border-b border-zinc-100">
                <span>Fecha de publicación:</span>
                <span>{product.publicationDate}</span>
              </div>
            </>
          )}
          {isBoardgame && (
            <>
              <div className="flex flex-row justify-between py1 border-b border-zinc-100">
                <span>Marca:</span>
                <span>{product.brand}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 