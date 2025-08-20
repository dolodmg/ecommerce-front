'use client'
import React from 'react';
import { Roboto, Newsreader } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowLeft, RotateCcw } from "lucide-react";

const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'] 
});

const newsreader = Newsreader({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600', '700'] });


/**
 * Componente para mostrar el resultado de un pago exitoso
 * 
 * Responsabilidades:
 * - Mostrar confirmación visual del pago exitoso
 * - Proporcionar información de la orden
 * - Permitir al usuario continuar navegando
 */
export const PaymentSuccess = ({ order, paymentResult, onContinueShopping }) => {
  return (
    <div className="text-center py-2">
      <div className="mx-auto mb-4 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      
      <h1 className={`${newsreader.className} text-4xl font-semibold text-green-800 mb-2`}>
        ¡Pago exitoso!
      </h1>
      
      <p className={`${roboto.className} text-zinc-600 mb-4`}>
        Tu pago ha sido procesado correctamente
      </p>
      
      <Card className={`${roboto.className} max-w-md mx-auto mb-4`}>
        <CardContent className="text-center space-y-1">
          <h1 className='font-semibold text-zinc-800 text-xl'>Detalles de la orden</h1>
          <p className="font-normal text-zinc-600 text-md">Número de orden: #{order.idOrder}</p>
          <p className="font-normal text-zinc-600 text-md">Total de la compra: ${order.totalPrice}</p>
        </CardContent>
      </Card>
      
      <div className={`${roboto.className} text-sm text-gray-500 bg-gray-50 p-4 rounded-lg max-w-md mx-auto mb-2`}>
        <p>📧 Recibirás un email de confirmación en breve.</p>
        <p>📦 Podes seguir el estado de tu pedido en tu cuenta.</p>
      </div>
      
      <Button
        onClick={onContinueShopping}
        size="lg"
        className="px-6 font-normal text-sm"
      >
        Continuar comprando
      </Button>
    </div>
  );
};

/**
 * Componente para mostrar errores en el proceso de pago
 * 
 * Responsabilidades:
 * - Mostrar mensaje de error de forma clara
 * - Proporcionar opciones de recuperación (reintentar, volver)
 * - Mantener el contexto de la orden
 */
export const PaymentError = ({ error, order, onRetry, onBackToCart }) => {
  const getErrorMessage = (error) => {
    if (error?.error) {
      return error.error;
    }
    if (error?.message) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Ocurrió un error inesperado al procesar el pago';
  };

  return (
    <div className="text-center py-12">
      <div className="mx-auto mb-6 w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
        <XCircle className="w-12 h-12 text-red-600" />
      </div>
      
      <h1 className={`${newsreader.className} text-4xl font-semibold text-red-800 mb-2`}>
        Error en el pago
      </h1>
      
      <p className={`${roboto.className} text-zinc-600 mb-6`}>
        No se pudo procesar tu pago
      </p>
      
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className={`${roboto.className} text-center text-zinc-800 font-medium`}>Detalles del error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-700 bg-red-50 p-4 rounded border border-red-200">
            {getErrorMessage(error)}
          </div>
          {order && (
            <div className="text-center pt-2 border-t">
              <p className="text-sm text-gray-600">Orden #{order.idOrder}</p>
              <p className="font-medium">${order.totalPrice}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className={`${roboto.className} space-y-4 max-w-md mx-auto font-normal text-md`}>
        <Button
          onClick={onRetry}
          variant="default"
          className="w-full flex flex-row justify-center items-center"
          size="lg"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reintentar pago
        </Button>
        
        <Button
          onClick={onBackToCart}
          variant="outline"
          className="w-full flex flex-row justify-center items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al carrito
        </Button>
      </div>
    </div>
  );
};

export default { PaymentSuccess, PaymentError };
