import { useState, useEffect } from 'react';
import { getPopAlbumsByDateDescAction } from '@/server/products/albums';

export const usePopAlbums = () => { 
    const [popAlbums, setPopAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopAlbums = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getPopAlbumsByDateDescAction();
                setPopAlbums(response || []);
            } catch (err) {
                console.error('❌ Error al cargar los álbumes:', err);
                setError(err.message);
                setPopAlbums([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPopAlbums();
    }, []);

    return { popAlbums, loading, error };
}