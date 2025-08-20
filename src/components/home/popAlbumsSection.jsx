'use client'
import React from "react";
import { usePopAlbums } from '@/hooks/usePopAlbums';
import ProductCard from '@/components/common/productCard';
import { Newsreader } from 'next/font/google';

const newsreader = Newsreader({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700'] });


export const PopAlbumsSection = ({ limit = 5 }) => {
    const { popAlbums, loading, error } = usePopAlbums();
    const displayed = popAlbums.slice(0, limit);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error al cargar los álbumes</div>;
    }

    return (
        <section className="w-full max-w-7-xl mx-auto px-4 py-12">
            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-zinc-300"></div>
                    <h2 className={`${newsreader.className} text-2xl font-normal text-center text-zinc-900 mx-4`}>
                        Lo último en música pop
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
                        <p>No hay álbumes disponibles en este momento.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default PopAlbumsSection;