'use client'
import React, { useState, useEffect } from "react";
import { getFilteredAction } from "@/server/products";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ui/productCard";
import { Inter } from "next/font/google";
import AlbumFilters from "@/components/filters/ui/albums/albumFilters";

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

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const albums = await getFilteredAction('MUSIC', minPrice, maxPrice, null, albumFormat);
                setAlbums(albums);
            } catch (err) {
                setError("Error al obtener los álbumes");
            } finally {
                setLoading(false);
            }
        };
        fetchAlbums();
    }, [minPrice, maxPrice, albumFormat]);

    if (loading) return <p>Cargando álbumes</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className='flex flex-row'>
            <div className="w-1/5">
                <AlbumFilters />
            </div>
            <div className={`${inter.className} w-4/5 flex flex-wrap items-start justify-center gap-4 mt-4`}>
            {loading ? (
                <p className="text-zinc-500">Cargando álbumes   ...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : albums.length > 0 ? (
                albums.map((album) => (
                <ProductCard key={album.idProduct} idProduct={album.idProduct} />
                ))
            ) : (
                <p className="text-zinc-500">No se encontraron álbumes con esos filtros.</p>
            )}
            </div>
        </div>
  ) ;
}

export default AlbumsPage;