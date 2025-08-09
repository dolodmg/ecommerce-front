'use client';
import { useEffect, createContext, useContext } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import { useCartData } from "@/hooks/useCartData";

const CartProviderContext = createContext({});

/**
 * Provider que maneja la inicialización automática del carrito
 * Responsabilidad única: Inicializar el carrito al cargar la aplicación
 */
export function CartProvider({ 
    children, 
    userId = 1,
    autoInitialize = true 
}) {
    const { initializeCart } = useCartActions();
    const { cartId, isLoading } = useCartData();

    // Inicializar carrito automáticamente
    useEffect(() => {
        if (autoInitialize && !cartId && !isLoading) {
            initializeCart(userId).catch(error => {
                console.error('Failed to initialize cart:', error);
            });
        }
    }, [autoInitialize, cartId, isLoading, initializeCart, userId]);

    const contextValue = {
        isInitialized: !!cartId && !isLoading,
        userId
    };

    return (
        <CartProviderContext.Provider value={contextValue}>
            {children}
        </CartProviderContext.Provider>
    );
}

/**
 * Hook para acceder al contexto del CartProvider
 */
export function useCartProvider() {
    const context = useContext(CartProviderContext);
    if (!context) {
        throw new Error('useCartProvider debe usarse dentro de CartProvider');
    }
    return context;
}

export default CartProvider;
