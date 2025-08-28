'use client';
import React from 'react';
import BookFilters from '@/components/books/BookFilters';
import ProductPageLayout from '@/components/common/ProductPageLayout';
import { useProductPage } from '@/hooks/useProductPage';

const BooksPage = () => {
    const {
        products: books,
        loading,
        error,
        showFilters,
        setShowFilters
    } = useProductPage('BOOKS');

    return (
        <ProductPageLayout
            title="libros"
            products={books}
            loading={loading}
            error={error}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            FiltersComponent={BookFilters}
        />
    );
};

export default BooksPage;