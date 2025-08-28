'use client'
import React, { useState, useEffect } from "react";
import { getFilteredAction } from "@/server/products/products";
import { useSearchParams } from "next/navigation";
import AlbumFilters from "@/components/albums/albumFilters";
import ProductPageLayout from "@/components/common/ProductPageLayout";

const AlbumsPage = () => {
    const [albums, setAlbums] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const minPrice = searchParams.get('minPrice');
                const maxPrice = searchParams.get('maxPrice');
                const albumFormat = searchParams.get('albumFormat') || '';
                const albumGenre = searchParams.get('albumGenre') || '';
                
                const data = await getFilteredAction('MUSIC', minPrice, maxPrice, null, albumFormat, albumGenre);
                setAlbums(data);
            } catch (err) {
                setError('Error al obtener los albums');
                console.error('Error fetching albums:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, [searchParams]);

    return (
        <ProductPageLayout
            title="música"
            products={albums}
            loading={loading}
            error={error}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            FiltersComponent={AlbumFilters}
        />
    );
};

export default AlbumsPage;