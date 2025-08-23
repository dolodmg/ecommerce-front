import { useState } from 'react';
import { searchProductsAction } from '@/server/products/products';

export const useSearchProducts = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const search = async (keyword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await searchProductsAction(keyword);
            setResults(response);
            console.log("Resultados de búsqueda:", response);
        } catch (err) {
            console.error("Error al buscar productos:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return { results, loading, error, search };
};