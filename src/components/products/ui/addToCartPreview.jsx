'use client'
import React, { useState } from "react";
import ProductStockAlert from "./productStockAlert";
import { Roboto } from "next/font/google";
import { ShoppingBasket } from "lucide-react";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const AddToCartPreview = ({ product }) => {
  const [showAlert, setShowAlert] = useState(false);
  const handleAddToCart = () => {
    if (product.stock === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    } else {
      console.log(`Producto ${product.name} agregado al carrito con cantidad 1`);
    } 
  }
  return (
    <div className="relative flex flex-col items-center w-full">
      <button 
        onClick={handleAddToCart}
        className={`${roboto.className} flex flex-row justify-center gap-1 text-sm font-extralight text-white bg-lime-900 hover:bg-lime-950 rounded-full px-4 py-2`}
      >
        <ShoppingBasket strokeWidth={1} size={20}/>
        COMPRARe
      </button>
      {showAlert && (
        <div className="absolute top-full mt-2 w-full flex justify-center">
          <ProductStockAlert product={product} />
        </div>
      )}
    </div>
  );
}

export default AddToCartPreview;