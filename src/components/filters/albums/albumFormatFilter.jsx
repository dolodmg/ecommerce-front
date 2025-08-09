'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFormatsAction } from '@/server/products/albums';
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
        <div className="flex flex-col text-xs gap-1">
            <p className={`${roboto.className} font-medium text-zinc-800`}>
            FORMATO
            </p>
            <div className={`${inter.className} flex flex-col gap-1 text-sky-950 font-medium`}>
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
        </div>
    )
}

export default AlbumFormatFilter;