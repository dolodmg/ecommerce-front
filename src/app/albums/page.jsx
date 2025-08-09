'use client'
import React, { useState, useEffect } from "react";
import { getFilteredAction } from "@/server/products/products";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ui/productCard";
import { Inter } from "next/font/google";
import AlbumFilters from "@/components/filters/albums/albumFilters";
import { FiFilter } from "react-icons/fi"; 

const inter = Inter(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const AlbumsPage = () => {
    const searchParams = useSearchParams();
    const [albums, setAlbums] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const albumFormat = searchParams.get('albumFormat') || '';
    const albumGenre = searchParams.get('albumGenre') || '';

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const albums = await getFilteredAction('MUSIC', minPrice, maxPrice, null, albumFormat, albumGenre);
                setAlbums(albums);
            } catch (err) {
                setError("Error al obtener los álbumes");
            } finally {
                console.log("✅ Finalizando carga");
                setLoading(false);
            }
        };
        fetchAlbums();
    }, [minPrice, maxPrice, albumFormat, albumGenre]);

    const [showFilters, setShowFilters] = useState(false);

    return (
        <main className="bg-zinc-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold mb-6 text-zinc-800 tracking-tight">Álbumes</h1>
                <div className="flex gap-8">
                    {/* Panel de Filtros */}
                    <aside className="hidden lg:block w-72">
                        <div className="sticky top-24 bg-white rounded-xl shadow p-6 border border-zinc-100">
                            <AlbumFilters />
                        </div>
                    </aside>

                    {/* Drawer de filtros en mobile */}
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
                                    <AlbumFilters />
                                </div>
                                <div className="flex-1" onClick={() => setShowFilters(false)} />
                            </div>
                        )}
                    </div>

                    {/* Grilla de productos */}
                    <section className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {loading ? (
                                <p className="col-span-full text-zinc-500">Cargando álbumes...</p>
                            ) : error ? (
                                <p className="col-span-full text-red-500">{error}</p>
                            ) : albums && albums.length > 0 ? (
                                albums.map((album) => (
                                    <ProductCard key={album.idProduct} idProduct={album.idProduct} />
                                ))
                            ) : (
                                <p className="col-span-full text-zinc-500">No se encontraron álbumes con esos filtros.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default AlbumsPage;