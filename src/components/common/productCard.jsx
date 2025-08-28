import React, { useState, useEffect } from "react";
import { getProductByIdAction } from "@/server/products/products";
import { Roboto, Inter } from "next/font/google";
import ProductStockAlert from "@/components/common/productStockAlert";
import { ProductImage } from "./productImage";
import Button from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useCartData } from "@/hooks/useCartData";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const inter = Inter(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function ProductCard({ idProduct }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        alert("Error al agregar al carrito");
      }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductByIdAction(idProduct); 
                setProduct(product);
            } catch (err) {
                setError('Error al obtener el producto');
            } finally {
                setLoading(false);
            }
        };
        if (idProduct) {
            fetchProduct();
        }
    }, [idProduct]);
    if (loading) return <p>Cargando producto</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className={`flex flex-col w-50 p-4 border border-green-900 rounded-lg`}>
            <Link href={`/products/${product.idProduct}`} className="block">
                <ProductImage product={product} className="object-cover w-full h-40 my-1 cursor-pointer hover:opacity-90 transition-opacity"/>
            </Link>
            <div className="h-6 text-center truncate">
                <Link href={`/products/${product.idProduct}`} className={`${roboto.className} text-md font-medium text-zinc-700 hover:text-orange-500 transition-colors`}>
                    {product.name}
                </Link>
            </div>
            <div>
                { (product.category === "BOOKS" || product.category === "MUSIC") ? 
                    <p className={`${roboto.className} text-sm font-light text-zinc-700 text-center`}>
                    {product.person.firstName} {product.person.lastName}
                    </p>    
                : null }
            </div>
            <p className={`${roboto.className} text-lg font-medium text-zinc-700 text-center mb-1`}>
                ${product.price}
            </p>
            <div className="relative flex flex-col items-center w-full">
                <Button 
                className={`${inter.className} py-2 px-4 mb-2 text-sm font-light text-white bg-green-900 hover:cursor-pointer hover:bg-green-950 rounded-full w-full`}
                onClick={handleAddToCart}
                text={
                    <div className="flex flex-row justify-center items-center gap-1">
                        <ShoppingBasket strokeWidth={1} size={18} />
                        Comprar
                    </div>
                }
                />
                {showAlert && (
                    <div className="absolute top-full mt-2 w-full flex justify-center">
                        <ProductStockAlert description={null} />
                    </div>
                )}
            </div>
        </div>
    )
}