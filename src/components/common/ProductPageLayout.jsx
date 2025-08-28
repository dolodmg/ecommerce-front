'use client';
import React from "react";
import { FiFilter } from "react-icons/fi";
import ProductCard from "@/components/common/productCard";
import { Concert_One } from 'next/font/google';

const concertOne = Concert_One({ subsets: ['latin'], weight: ['400'] });

export default function ProductPageLayout({ 
    title, 
    products, 
    loading, 
    error, 
    showFilters, 
    setShowFilters, 
    FiltersComponent 
}) {
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando {title.toLowerCase()}...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
                <p className="text-gray-600">{error}</p>
            </div>
        );
    }

    return (
        <main className="bg-zinc-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className={`${concertOne.className} text-5xl font-extrabold mb-6 text-pink-300 [-webkit-text-stroke:1.5px_#14532d] tracking-tight`}>{title}</h1>
                <div className="flex gap-8">
                    <aside className="hidden lg:block w-72">
                        <div className="sticky top-24 bg-white rounded-xl shadow p-6 border border-zinc-100">
                            <FiltersComponent />
                        </div>
                    </aside>

                    <div className="lg:hidden mb-4">
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-200 rounded-lg font-medium text-zinc-700 hover:bg-zinc-300 transition"
                            onClick={() => setShowFilters(true)}
                        >
                            <FiFilter /> Filtros
                        </button>
                        {showFilters && (
                            <div className="fixed inset-0 z-40 bg-black/40 flex">
                                <div className="bg-white w-80 max-w-full h-full p-6 shadow-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold flex items-center gap-2">
                                            <FiFilter className="text-zinc-500" /> Filtros
                                        </h2>
                                        <button onClick={() => setShowFilters(false)} className="text-zinc-500 hover:text-zinc-800 text-2xl">&times;</button>
                                    </div>
                                    <FiltersComponent />
                                </div>
                                <div className="flex-1" onClick={() => setShowFilters(false)} />
                            </div>
                        )}
                    </div>

                    <section className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products && products.length > 0 ? (
                                products.map(product => (
                                    <ProductCard key={product.idProduct} idProduct={product.idProduct} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500">No se encontraron productos</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
