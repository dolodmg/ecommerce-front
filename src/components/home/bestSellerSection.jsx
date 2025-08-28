'use client'
import React from "react";
import { useBestSellers } from '@/hooks/useBestSellers';
import ProductCard from '@/components/common/productCard';
import { Concert_One } from 'next/font/google';

const concertOne = Concert_One({ subsets: ['latin'], weight: ['400'] });

export const BestSellerSection = ({ limit = 5 }) => {
    const category = "BOOKS";
    const { bestSellers, loading, error } = useBestSellers(category);
    const displayed = bestSellers.slice(0, limit);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error al cargar los libros</div>;
    }

    return (
        <section className="w-full max-w-7-xl mx-auto px-4 py-12">
            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-zinc-300"></div>
                    <h2 className={`${concertOne.className} text-4xl font-extrabold text-center text-pink-300 [-webkit-text-stroke:1.5px_#14532d] mx-4`}>
                        los más vendidos
                    </h2>
                <div className="flex-grow border-t border-zinc-300"></div>
            </div>
            <div className="mx-2 md:mx-15 flex justify-center">
                { displayed && displayed.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                        {displayed.map(product => (
                            <ProductCard key={product.idProduct} idProduct={product.idProduct} />
                        ))}
                    </div>  
                ) : (
                    <div className="text-center text-zinc-600">
                        <p>No hay libros disponibles en este momento.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BestSellerSection;