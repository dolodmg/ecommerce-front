import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

export function useProductPage(category) {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchProducts = async () => {
            console.log('🔄 fetchProducts called for category:', category);
            try {
                setLoading(true);
                setError(null);
                
                // Dinámicamente importar la función de productos
                const { getFilteredAction } = await import('@/server/products/products');
                
                const minPrice = searchParams.get('minPrice');
                const maxPrice = searchParams.get('maxPrice');
                
                // Mapear filtros específicos según la categoría
                let genre = '';
                let albumFormat = '';
                let albumGenre = '';
                
                if (category === 'MUSIC') {
                    albumFormat = searchParams.get('albumFormat') || '';
                    albumGenre = searchParams.get('albumGenre') || '';
                } else if (category === 'BOOKS') {
                    genre = searchParams.get('genre') || '';
                } else if (category === 'BOARDGAMES') {
                    // Boardgames normalmente no tienen filtros específicos en este API
                    // Podrían usar genre si tienen categorías
                    genre = searchParams.get('boardgameGenre') || '';
                }
                
                const data = await getFilteredAction(category, minPrice, maxPrice, genre, albumFormat, albumGenre);
                console.log('✅ Products fetched successfully:', data?.length || 0, 'items');
                setProducts(data);
            } catch (err) {
                setError('Error al obtener los productos');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchParams, category]); // Cambio: volver a usar searchParams directamente

    return {
        products,
        loading,
        error,
        showFilters,
        setShowFilters
    };
}
