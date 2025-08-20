import { useState, useEffect } from 'react';
import { getBestSellersAction } from '@/server/orders/bestSellers';

export const useBestSellers = (category) => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getBestSellersAction(category);
                setBestSellers(response || []);
            } catch (err) {
                console.error('❌ Error fetching best sellers:', err);
                setError(err.message);
                setBestSellers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBestSellers();
    }, [category]); 

    return { bestSellers, loading, error };
}