'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAlbumGenresAction } from '@/server/products/albums';
import { Inter, Roboto } from "next/font/google";

const inter = Inter(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const AlbumGenreFilter = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genres = await getAlbumGenresAction();
                setGenres(genres);
            } catch (err) {
                setError("Error al obtener los géneros de álbumes");
            } finally {
                setLoading(false);
            }
        };
        fetchGenres();
    }, []);

    if (loading) return <p>Cargando géneros...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className="flex flex-col text-xs">
            <p className={`${roboto.className} font-medium text-zinc-800`}>
            GÉNERO
            </p>
            <div className={`${inter.className} flex flex-col gap-1 text-green-950 font-medium`}>
                { genres && genres.length > 0 ? (
                    genres.map(albumGenre => (
                        <Link 
                        href={`/albums?albumGenre=${encodeURIComponent(albumGenre.name)}`}
                        key={albumGenre.name}> {albumGenre.display}
                        </Link>
                    ))) : ( 
                    <p>No se encontraron géneros.</p>
                )} 
            </div>  
        </div>
    )
}

export default AlbumGenreFilter;