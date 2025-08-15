import { useCartData } from "@/hooks/useCartData";
import CartItem from "./CartItem";
import { cn } from "@/lib/utils";

/**
 * Componente que renderiza la lista de items del carrito
 * Responsabilidad única: Manejar la renderización de múltiples CartItem
 */
export function CartItemList({ 
    className,
    emptyMessage = "Tu carrito está vacío",
    showEmptyState = true,
    itemProps = {},
    ...props 
}) {
    const { items, isEmpty, isLoading } = useCartData();

    if (isLoading) {
        return (
            <div className={cn("p-4 text-center", className)} {...props}>
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (isEmpty && showEmptyState) {
        return (
            <div className={cn("p-4 text-center", className)} {...props}>
                <p className="text-gray-500">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className={cn("divide-y divide-gray-100", className)} {...props}>
            {items.map((item) => (
                <CartItem
                    key={item.product.idProduct}
                    item={item}
                    {...itemProps}
                />
            ))}
        </div>
    );
}

export default CartItemList;
