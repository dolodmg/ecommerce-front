'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getGenresAction } from '@/server/books';
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
        <div className={`${inter.className} flex flex-col text-xs text-medium text-slate-800 gap-2 ml-2`}>
            { genres && genres.length > 0 ? (
                genres.map(genre => (
                    <Link 
                    href={`/books?genre=${encodeURIComponent(genre.name)}`}
                    key={genre.name}> {genre.display}
                    </Link>
            ))) : ( 
                <p>No se encontraron géneros.</p>
             )} 
        </div>
    )
}

export default BookGenreFilter;