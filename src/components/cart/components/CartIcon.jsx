import { ShoppingCartIcon } from "lucide-react";
import { useCartData } from "@/hooks/useCartData";
import { cn } from "@/lib/utils";

/**
 * Componente que muestra el ícono del carrito con contador de items
 * Responsabilidad única: Mostrar estado visual del carrito
 */
export function CartIcon({ 
    className,
    iconSize = 20,
    showBadge = true,
    onClick,
    ...props 
}) {
    const { itemsCount, isLoading } = useCartData();

    return (
        <div 
            className={cn(
                "relative cursor-pointer",
                className
            )}
            onClick={onClick}
            {...props}
        >
            <ShoppingCartIcon 
                size={iconSize} 
                className={cn(
                    "transition-colors duration-200",
                    isLoading && "animate-pulse"
                )}
            />
            
            {showBadge && itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium">
                    {itemsCount > 99 ? '99+' : itemsCount}
                </span>
            )}
        </div>
    );
}

export default CartIcon;
