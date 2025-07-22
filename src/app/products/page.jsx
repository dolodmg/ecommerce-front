'use client'
import React, { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import { getProductByIdAction } from "@/server/products";
import ProductImage from "@/components/products/ui/productImage";
import ProductInfo from "@/components/products/ui/productInfo";
import AddToCart from "@/components/products/ui/addToCart";
import AddItems from "@/components/products/ui/addItems";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function Product({ idProduct = 152 }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const product = await getProductByIdAction(idProduct);
            setProduct(product);   
          } catch (err) {
            setError('Error al obtener los detalles del producto');
          } finally {
            setLoading(false);
          }
        };
        if (idProduct) {
          fetchProduct();
        }
      }, [idProduct]);

      if (loading) return <p>Cargando...</p>
      if (error) return <p>{error}</p>
      if (!product) return <p>No se encontró el producto.</p>;
      return (
        <div className={`${roboto.className} flex flex-row gap-10`}>
          <ProductImage product={product} />
          <div className="flex flex-col gap-4">
            <ProductInfo product={product} />
            <div className="flex flex-col w-64 gap-4">
              <AddItems 
                quantity={quantity} 
                onAdd={() => setQuantity(q => q + 1)}
                onRemove={() => setQuantity(q => Math.max(1, q - 1))} 
                className="w-full"
              />
              <AddToCart 
                product={product} 
                quantity={quantity}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )
    }