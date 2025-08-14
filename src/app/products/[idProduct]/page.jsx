'use client'
import React, { useState, useEffect } from "react";
import { getProductByIdAction } from "@/server/products/products";
import ProductDetail from "@/components/common/ProductDetail";
import { useParams } from "next/navigation";

export default function Product( ) {
    const { idProduct } = useParams(); 
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
        <div className="flex flex-col items-center w-full">
          <ProductDetail 
            product={product} 
            quantity={quantity}
            onAdd={() => setQuantity(q => q + 1)}
            onRemove={() => setQuantity(q => Math.max(1, q - 1))}
          />
        </div>
      )
    }