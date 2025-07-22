'use client'
import React, { useState } from "react";
import { Roboto } from "next/font/google";
import ProductStockAlert from "./productStockAlert";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const AddToCart = ({ product, quantity }) => {
  const [showAlert, setShowAlert] = useState(false);
  const handleAddToCart = () => {
    if (quantity > product.stock) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    } else {
      console.log(`Producto ${product.name} agregado al carrito con cantidad: ${quantity}`);
    } 
  }
  return (
    <div className="relative flex flex-col items-center w-full">
      <button 
        onClick={handleAddToCart}
        className={`${roboto.className} text-md font-extralight text-white bg-slate-700 hover:bg-slate-800 rounded-full px-4 py-2 w-full}`}
      >
        AGREGAR AL CARRITO
      </button>
      {showAlert && (
        <div className="absolute top-full mt-2 w-full flex justify-center">
          <ProductStockAlert product={product} />
        </div>
      )}
    </div>
  );
}

export default AddToCart;