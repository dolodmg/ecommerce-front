'use client'
import React from "react";
import BoardgameFilters from "@/components/boardgames/boardgameFilters";
import ProductPageLayout from "@/components/common/ProductPageLayout";
import { useProductPage } from "@/hooks/useProductPage";

export default function BoardgamePage() {
    const {
        products: boardgames,
        loading,
        error,
        showFilters,
        setShowFilters
    } = useProductPage('BOARDGAMES');

    return (
        <ProductPageLayout
            title="juegos de mesa"
            products={boardgames}
            loading={loading}
            error={error}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            FiltersComponent={BoardgameFilters}
        />
    );
}