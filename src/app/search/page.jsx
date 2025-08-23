'use client'
import React, { useEffect } from "react";
import ProductCard from "@/components/common/productCard";
import { Roboto } from 'next/font/google';
import { useSearchParams } from "next/navigation";
import { useSearchProducts } from "@/hooks/useSearchProducts";

const roboto = Roboto({ subsets: ['latin'] });

export const SearchResults = () => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get("keyword");
    const { results, loading, error, search } = useSearchProducts(keyword);
    
    useEffect(() => {
        if (keyword) {
            search(keyword);
        }
    }, [keyword]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <p className={`${roboto.className} text-zinc-600 text-md font-normal`}>Buscando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-12">
                <p className={`${roboto.className} text-red-600 text-md font-normal`}>Error: {error}</p>
            </div>
        );
    }

    return (
    <section className="flex-1 mt-6 ml-20">
        <h1 className={`${roboto.className} text-zinc-700 text-3xl font-semibold`}>Resultados de búsqueda</h1>
        <p className={`${roboto.className} text-zinc-600 text-md font-normal mt-8`}>
            Mostrando los resultados para 
            <span className="font-semibold ml-1">
                "{keyword}"
            </span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 mt-4">
            {results && results.length > 0 ? (
                results.map(product => (
                    <ProductCard key={product.idProduct} idProduct={product.idProduct} />
                ))
            ) : (
                <div className="col-span-full text-center py-12">
                    <p className={`${roboto.className} text-zinc-600 text-lg font-light`}>No se encontraron productos que coincidan con la búsqueda.</p>
                </div>
            )}
        </div>
    </section>
    );
};

export default SearchResults;