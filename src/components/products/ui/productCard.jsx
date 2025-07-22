import React, { useState, useEffect } from "react";
import { getProductByIdAction } from "@/server/products";
import { Roboto } from "next/font/google";
import AddToCartPreview from "@/components/products/ui/addToCartPreview";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function ProductCard({ idProduct }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div className={`flex flex-col w-40`}>
            <img 
                className="object-cover w-full h-40 my-1"
                src={"/images/tayalbum.png"}
                alt={product.name}
                />
            <div className="h-6">
                <p className={`${roboto.className} text-md font-medium text-zinc-700 text-center truncate`}>
                    {product.name}
                </p>
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
            <AddToCartPreview product={product}/>
        </div>
    )
}