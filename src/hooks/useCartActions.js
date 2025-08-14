import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    setCart, 
    setCartLoading, 
    setCartError,
    selectCartById,
    selectCartItems,
    selectCartItemsCount,
    selectCartTotal,
    selectCartIsEmpty
} from "@/store/cartSlice";
import { store } from "@/store/store";
import { 
    getCartAction, 
    addItemToCartAction, 
    removeItemFromCartAction, 
    clearCartAction 
} from "@/server/carts/carts";
import { updateQuantityAction } from "@/server/carts/cartItems";
import { getProductByIdAction } from "@/server/products/products";

/**
 * Hook para manejar las acciones del carrito
 * Separa la lógica de las acciones de la lógica de presentación
 */
export function useCartActions() {
    const dispatch = useDispatch();
    const cartId = useSelector(selectCartById);
    const items = useSelector(selectCartItems);
    const [isOperating, setIsOperating] = useState(false);

    const syncWithBackend = useCallback(async (operation) => {
        setIsOperating(true);
        dispatch(setCartLoading(true));
        
        try {
            const result = await operation();
            dispatch(setCartError(null));
            return result;
        } catch (error) {
            dispatch(setCartError(error.message || 'Error en operación del carrito'));
            throw error;
        } finally {
            setIsOperating(false);
            dispatch(setCartLoading(false));
        }
    }, [dispatch]);

    const initializeCart = useCallback(async (userId = 1) => {
        return syncWithBackend(async () => {
            const cartData = await getCartAction(userId);
            
            if (cartData && cartData.idCart) {
                const backendItems = Array.isArray(cartData.items) ? cartData.items : [];
                
                const enrichedItems = await Promise.all(
                    backendItems.map(async (item) => {
                        try {
                            if (item.product && item.product.name && item.product.price) {
                                return {
                                    ...item,
                                    idProduct: item.product.idProduct || item.idProduct
                                };
                            }
                            
                            const productData = await getProductByIdAction(item.idProduct);
                            return {
                                ...item,
                                idProduct: item.idProduct,
                                product: productData
                            };
                        } catch (error) {
                            return {
                                ...item,
                                idProduct: item.idProduct,
                                product: { 
                                    idProduct: item.idProduct,
                                    name: `Producto ${item.idProduct}`,
                                    price: 0
                                }
                            };
                        }
                    })
                );
                
                dispatch(setCart({
                    idCart: cartData.idCart,
                    items: enrichedItems
                }));
                
                return cartData;
            }
            throw new Error('No cart data received');
        });
    }, [dispatch, syncWithBackend]);

    const addItemToCart = useCallback(async (product, quantity = 1) => {
        if (!product || !product.idProduct) {
            throw new Error('Producto inválido');
        }
        
        if (!cartId) {
            throw new Error('Carrito no inicializado');
        }

        return syncWithBackend(async () => {
            await addItemToCartAction(cartId, {
                idProduct: product.idProduct,
                quantity
            });

            await initializeCart();
        });
    }, [cartId, dispatch, syncWithBackend]);

    const updateItemQuantity = useCallback(async (idProduct, newQuantity) => {
        if (newQuantity <= 0) {
            return removeItemFromCart(idProduct);
        }

        return syncWithBackend(async () => {
            const item = items.find(item => item.product?.idProduct === idProduct);
            if (!item) {
                throw new Error('Item no encontrado en el carrito');
            }

            if (!item.idItem || (typeof item.idItem === 'string' && item.idItem.startsWith('temp-'))) {
                await initializeCart();
                throw new Error('Cart refreshed. Please try the operation again.');
            }

            await updateQuantityAction(item.idItem, newQuantity);
            await initializeCart();
        });
    }, [items, dispatch, syncWithBackend, initializeCart]);

    const removeItemFromCart = useCallback(async (idProduct) => {
        const item = items.find(item => item.product?.idProduct === idProduct);
        if (!item) {
            throw new Error('Item no encontrado en el carrito');
        }

        return syncWithBackend(async () => {
            await removeItemFromCartAction(cartId, idProduct);
            dispatch(removeItem({ idProduct }));
        });
    }, [items, dispatch, syncWithBackend]);

    const clearCartItems = useCallback(async () => {
        if (!cartId) {
            throw new Error('Carrito no inicializado');
        }

        return syncWithBackend(async () => {
            await clearCartAction(cartId);
            dispatch(clearCart());
        });
    }, [cartId, dispatch, syncWithBackend]);

    const incrementQuantity = useCallback(async (idProduct) => {
        const item = items.find(item => item.product?.idProduct === idProduct);
        if (item) {
            return updateItemQuantity(idProduct, item.quantity + 1);
        }
    }, [items, updateItemQuantity]);

    const decrementQuantity = useCallback(async (idProduct) => {
        const item = items.find(item => item.product?.idProduct === idProduct);
        if (item) {
            const newQuantity = item.quantity - 1;
            if (newQuantity <= 0) {
                return removeItemFromCart(idProduct);
            }
            return updateItemQuantity(idProduct, newQuantity);
        }
    }, [items, updateItemQuantity, removeItemFromCart]);

    return {
        isOperating,
        initializeCart,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCartItems,
        incrementQuantity,
        decrementQuantity
    };
}
