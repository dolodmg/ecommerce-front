'use client'
import React from "react";
import { Inter } from "next/font/google";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'] 
});

/**
 * Componente que muestra el resumen de una orden de compra
 * 
 * Responsabilidades:
 * - Mostrar detalles de la orden (items, precios, totales)
 * - Calcular impuestos y total final
 * - Presentar información de manera clara para el usuario
 */
export const OrderSummary = ({ order }) => {
    if (!order) {
        return (
            <div className="text-center p-4 text-gray-500">
                Cargando información de la orden...
            </div>
        );
    }

    // Obtener datos de la orden
    const subtotal = order.totalPrice || 0;
    const itemsCount = order.items?.length || 0;
    const totalQuantity = order.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
    
    // Calcular impuestos (10%)
    const taxRate = 0.1;
    const taxes = subtotal * taxRate;
    const orderTotal = subtotal + taxes;

    return (
        <div className={`${inter.className} space-y-4`}>
            {/* Header */}
            <div className="text-center flex flex-col gap-1">
                <h1 className="font-semibold text-zinc-700 text-xl">Resumen de compra</h1>
                <p className="text-sm text-zinc-600">Orden #{order.idOrder}</p>
            </div>

            <Separator />

            {/* Totales */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-zinc-600">
                    <span>Subtotal ({totalQuantity} {totalQuantity === 1 ? 'producto' : 'productos'})</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-zinc-600">
                    <span>Impuestos ({(taxRate * 100)}%)</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                </div>
            </div>

            {/* Estado de la orden */}
            {order.status && (
                <div className="mt-4 pt-4 border-t">
                    <div className="text-center">
                        <span className="text-xs text-gray-500">Estado: </span>
                        <span className={`text-xs font-medium ${
                            order.status === 'PENDING' ? 'text-pink-400' :
                            order.status === 'PAID' ? 'text-green-600' :
                            order.status === 'CANCELLED' ? 'text-red-600' :
                            'text-gray-600'
                        }`}>
                            {order.status === 'PENDING' ? 'Pendiente de pago' :
                             order.status === 'PAID' ? 'Pagado' :
                             order.status === 'CANCELLED' ? 'Cancelado' :
                             order.status}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
