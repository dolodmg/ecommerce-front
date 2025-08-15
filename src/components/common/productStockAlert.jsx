'use client';
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Newsreader } from "next/font/google";

const newsreader = Newsreader({ subsets: ['latin'], weight: ['300'] });

export const ProductStockAlert = ({ description }) => {
    return (
        <Alert variant="destructive" className={`${newsreader.className} bg-transparent mt-2 border-red-400`}>
            <AlertTitle>Stock insuficente</AlertTitle>
            { description && (
                <AlertDescription>
                    <p>{description}</p>
                </AlertDescription>
            )}
        </Alert>
    )
}

export default ProductStockAlert;