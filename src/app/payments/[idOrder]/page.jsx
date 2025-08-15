'use client'
import React from "react";
import { PaymentPageContainer } from "@/components/payment/PaymentPageContainer";

/**
 * Página de pagos para una orden específica
 * Ruta: /payments/[idOrder]
 * 
 * Responsabilidades:
 * - Recibir el idOrder desde los parámetros de ruta usando React.use()
 * - Renderizar el contenedor de pagos
 * 
 * Nota: En Next.js 15+, params es una Promise que debe ser unwrapped con React.use()
 */
export default function PaymentPage({ params }) {
    // Unwrap params Promise usando React.use() para Next.js 15+
    const { idOrder } = React.use(params);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <PaymentPageContainer idOrder={idOrder} />
            </div>
        </div>
    );
}
