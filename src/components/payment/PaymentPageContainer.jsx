'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OrderSummary } from "./OrderSummary";
import PaymentForm from "./PaymentForm";
import { PaymentSuccess, PaymentError } from "./PaymentFeedback";
import { useCartActions } from "@/hooks/useCartActions";
import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Newsreader, Roboto, Inter } from "next/font/google";


const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700'] });
const newsreader = Newsreader({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700'] });



/**
 * Contenedor principal para el proceso de pago
 * 
 * Responsabilidades:
 * - Obtener información de la orden usando useOrders hook
 * - Manejar el flujo de pago (éxito/error)
 * - Coordinar los componentes de OrderSummary y PaymentForm
 * - Manejar la limpieza del carrito tras pago exitoso
 * - Seguir principios SOLID: Single Responsibility y Dependency Inversion
 */
export function PaymentPageContainer({ idOrder }) {
    const router = useRouter();
    const { clearCartItems } = useCartActions();
    const { getOrderById, isLoadingOrder, error: orderError } = useOrders();
    
    const [order, setOrder] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'error'
    const [paymentResult, setPaymentResult] = useState(null);

    // Función para obtener la orden por ID usando el hook
    const fetchOrder = async (idOrder) => {
        try {
            const orderData = await getOrderById(idOrder);
            setOrder(orderData);
        } catch (error) {
            console.error('Error al obtener la orden:', error);
            // El error ya se maneja en el hook useOrders
        }
    };

    useEffect(() => {
        if (idOrder) {
            fetchOrder(idOrder);
        }
    }, [idOrder]);

    const handlePaymentSuccess = async (result) => {
        try {
            await clearCartItems();
            setPaymentStatus('success');
            setPaymentResult(result);
        } catch (error) {
            setPaymentStatus('error');
            setPaymentResult({ error: 'Error al finalizar el proceso de pago' });
        }
    };

    const handlePaymentError = (error) => {
        setPaymentStatus('error');
        setPaymentResult(error);
    };

    const handlePaymentCancel = () => {
        setPaymentStatus(null);
        setPaymentResult(null);
    };

    const handleBackToCart = () => {
        router.push('/'); // o la ruta donde esté el carrito
    };

    const handleContinueShopping = () => {
        router.push('/');
    };

    const handleRetryPayment = () => {
        setPaymentStatus(null);
        setPaymentResult(null);
    };

    if (isLoadingOrder) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando información de la orden...</p>
                </div>
            </div>
        );
    }

    if (orderError || !order) {
        return (
            <div className="text-center py-12">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Orden no encontrada
                    </h2>
                    <p className="text-gray-600">
                        {orderError || 'No se pudo encontrar la información de esta orden'}
                    </p>
                </div>
                <Button onClick={handleBackToCart} variant="outline" className="flex flex-row gap-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <p>Volver al carrito</p>
                </Button>
            </div>
        );
    }

    if (paymentStatus === 'success') {
        return (
            <PaymentSuccess 
                order={order}
                paymentResult={paymentResult}
                onContinueShopping={handleContinueShopping}
            />
        );
    }

    if (paymentStatus === 'error') {
        return (
            <PaymentError 
                order={order}
                error={paymentResult}
                onRetry={handleRetryPayment}
                onBackToCart={handleBackToCart}
            />
        );
    }

    return (
        <div>
            <div className="mb-8">
                <Button 
                    onClick={handleBackToCart} 
                    variant="ghost" 
                    className="mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al carrito
                </Button>
                
                <h1 className={`${newsreader.className} text-4xl font-semibold text-zinc-700`}>
                    Completar compra
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className={`${inter.className} font-semibold text-zinc-700 text-xl`}>Información de pago</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PaymentForm 
                                order={order}
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                                onCancel={handlePaymentCancel}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-8">
                        <CardContent>
                            <OrderSummary order={order} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
