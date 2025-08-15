import { useCartData } from "./useCartData";
import { useCartActions } from "./useCartActions";

/**
 * Hook principal del carrito que combina datos y acciones
 * Mantiene compatibilidad con la implementación anterior
 * @deprecated Considera usar useCartData y useCartActions por separado para mejor rendimiento
 */
export function useCart() {
  const cartData = useCartData();
  const cartActions = useCartActions();

  // Combinar ambos hooks para compatibilidad hacia atrás
  return {
    // Datos del carrito
    ...cartData,
    
    // Acciones del carrito
    ...cartActions,
    
    // Compatibilidad con nombres anteriores
    cart: cartData.cart,
    add: cartActions.addItemToCart,
    remove: cartActions.removeItemFromCart,
    update: cartActions.updateItemQuantity,
    clear: cartActions.clearCartItems,
    refreshCart: cartActions.initializeCart,
    
    // Estados adicionales
    isInitialized: cartData.cartId && !cartData.isLoading,
  };
}
