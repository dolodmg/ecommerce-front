'use client';
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


export default function ProductStockAlert({ product }) {
    return (
        <Alert variant="destructive" className="bg-transparent mt-2 border-red-400">
            <AlertTitle>Stock insuficente</AlertTitle>
            <AlertDescription>
            <p>¡Solo hay {product.stock} unidades disponibles! Por favor, ajustá la cantidad.</p>
            </AlertDescription>
        </Alert>
    )
}