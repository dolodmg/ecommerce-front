import { useState } from 'react';
import { createOrderAction } from '@/server/orders/orders';
import { getOrderAction } from '@/server/orders/orders';

export function useOrders() {
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [isLoadingOrder, setIsLoadingOrder] = useState(false);
    const [error, setError] = useState(null);
    
    const createOrder = async (idCart, idUser) => {
        if (!idCart) throw new Error('Se necesita el ID del carrito para crear una orden');
        if (!idUser) throw new Error('Se necesita el ID del usuario para crear una orden');

        setIsCreatingOrder(true);
        setError(null);

        try {
            const orderData = await createOrderAction({
                idCart,
                idUser
            });

            return orderData;
        } catch (error) {
            console.error('Error al crear la orden de compra');
            setError(error.message);
            throw error;
        } finally {
            setIsCreatingOrder(false);
        }
    };

    const getOrderById = async (idOrder) => {
        if (!idOrder) throw new Error('Se necesita el ID de la orden');

        setIsLoadingOrder(true);
        setError(null);

        try {
            const orderData = await getOrderAction(idOrder);
            return orderData;
        } catch (error) {
            console.error('Error al obtener la orden');
            setError(error.message);
            throw error;
        } finally {
            setIsLoadingOrder(false);
        }
    };

    return {
        createOrder,
        getOrderById,
        isCreatingOrder,
        isLoadingOrder,
        error
    }
}