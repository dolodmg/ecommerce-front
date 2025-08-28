'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getGenresAction } from '@/server/products/books';
import { Inter } from "next/font/google";

const inter = Inter(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const BookGenreFilter = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const VISIBLE_COUNT = 5;
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genres = await getGenresAction();
                setGenres(genres);
                console.log("Generos", genres);
            } catch (err) {
                setError("Error al obtener los géneros");
            } finally {
                setLoading(false);
            }
        };
        fetchGenres();
    }, []);

    if (loading) return <p>Cargando géneros...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className={`${inter.className} flex flex-col text-xs gap-1`}>
            <p className="font-medium text-zinc-800 mb-1">GÉNERO LITERARIO</p>
            <div className="flex flex-col gap-1 text-green-950 font-medium">
                {genres && genres.length > 0 ? (
                    <>
                        {(showAll ? genres : genres.slice(0, VISIBLE_COUNT)).map(genre => (
                            <Link 
                                href={`/books?genre=${encodeURIComponent(genre.name)}`}
                                key={genre.name}> {genre.display}
                            </Link>
                        ))}
                        {genres.length > VISIBLE_COUNT && (
                            <button
                                className="text-xs text-blue-700 hover:underline mt-1 text-left w-fit"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? 'Ver menos' : 'Ver más'}
                            </button>
                        )}
                    </>
                ) : (
                    <p>No se encontraron géneros.</p>
                )}
            </div>
        </div>
    )
}

export default BookGenreFilter;