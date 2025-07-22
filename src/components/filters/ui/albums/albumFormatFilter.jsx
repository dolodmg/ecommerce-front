'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFormatsAction } from '@/server/albums';
import { Inter } from "next/font/google";

const inter = Inter(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

const AlbumFormatFilter = () => {
    const [formats, setFormats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchFormats = async () => {
            try {
                const formats = await getFormatsAction();
                setFormats(formats);
            } catch (err) {
                setError("Error al obtener los formatos de álbumes");
            } finally {
                setLoading(false);
            }
        };
        fetchFormats();
    }, []);

    if (loading) return <p>Cargando formatos...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className={`${inter.className} flex flex-col text-xs text-medium text-slate-800 gap-2 ml-2`}>
            { formats && formats.length > 0 ? (
                formats.map(albumFormat => (
                    <Link 
                    href={`/albums?albumFormat=${encodeURIComponent(albumFormat.name)}`}
                    key={albumFormat.name}> {albumFormat.display}
                    </Link>
            ))) : ( 
                <p>No se encontraron formatos.</p>
             )} 
        </div>
    )
}

export default AlbumFormatFilter;