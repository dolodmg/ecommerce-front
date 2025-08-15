import { useSelector } from "react-redux";
import { 
    selectCartItems,
    selectCartItemsCount,
    selectCartTotal,
    selectCartSubtotal,
    selectCartIsEmpty,
    selectCartById,
    selectCart
} from "@/store/cartSlice";

/**
 * Hook para acceder a los datos del carrito (solo lectura)
 * Separado de las acciones para mejor rendimiento y claridad
 */
export function useCartData() {
    const cart = useSelector(selectCart);
    const items = useSelector(selectCartItems);
    const itemsCount = useSelector(selectCartItemsCount);
    const total = useSelector(selectCartTotal);
    const subtotal = useSelector(selectCartSubtotal);
    const isEmpty = useSelector(selectCartIsEmpty);
    const cartId = useSelector(selectCartById);

    const getItemById = (idProduct) => {
        return items.find(item => item.product?.idProduct === idProduct);
    };

    const isInCart = (idProduct) => {
        return items.some(item => item.product?.idProduct === idProduct);
    };

    const getItemQuantity = (idProduct) => {
        const item = getItemById(idProduct);
        return item ? item.quantity : 0;
    };

    return {
        cart,
        cartId,
        items,
        isEmpty,
        isLoading: cart.isLoading,
        error: cart.error,
        itemsCount,
        total,
        subtotal,
        getItemById,
        isInCart,
        getItemQuantity
    };
}
