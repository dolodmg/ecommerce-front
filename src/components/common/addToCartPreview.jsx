'use client'
import React, { useState } from "react";
import ProductStockAlert from "@/components/common/productStockAlert";
import { Roboto } from "next/font/google";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useCartData } from "@/hooks/useCartData";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const AddToCartPreview = ({ product }) => {
  const [showAlert, setShowAlert] = useState(false);
  const { add } = useCart();
  const { getItemById } = useCartData();

  const handleAddToCart = async () => {
    // Obtener cantidad actual en el carrito
    const itemInCart = getItemById(product.idProduct);
    const currentQuantity = itemInCart ? itemInCart.quantity : 0;
    
    // Verificar si agregar 1 más excedería el stock
    if (currentQuantity + 1 > product.stock) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    try {
      await add(product, 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
  return (
    <div className="relative flex flex-col items-center w-full">
      <button 
        onClick={handleAddToCart}
        className={`${roboto.className} flex flex-row justify-center gap-1 text-sm font-extralight text-white bg-slate-700 hover:bg-slate-800 rounded-full px-4 py-2`}
      >
        <ShoppingBasket strokeWidth={1} size={20}/>
        COMPRAR
      </button>
      {showAlert && (
        <div className="absolute top-full mt-2 w-full flex justify-center">
          <ProductStockAlert description={null} />
        </div>
      )}
    </div>
  );
}

export default AddToCartPreview;