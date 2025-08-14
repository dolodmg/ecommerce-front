import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartData } from "@/hooks/useCartData";
import { useCartActions } from "@/hooks/useCartActions";
import { cn } from "@/lib/utils";

/**
 * Componente para agregar productos al carrito con selector de cantidad
 * Responsabilidad única: Permitir agregar productos con cantidad personalizada
 */
export function AddToCartButton({ 
    product,
    variant = "default",
    size = "default",
    showQuantitySelector = true,
    minQuantity = 1,
    maxQuantity = 99,
    className,
    children,
    ...props 
}) {
    const [quantity, setQuantity] = useState(minQuantity);
    const [isAdding, setIsAdding] = useState(false);
    
    const { isInCart, getItemQuantity } = useCartData();
    const { addItemToCart } = useCartActions();

    const currentQuantity = getItemQuantity(product.idProduct);
    const inCart = isInCart(product.idProduct);

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            await addItemToCart(product, quantity);
            // Resetear cantidad después de agregar
            setQuantity(minQuantity);
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const incrementQuantity = () => {
        setQuantity(prev => Math.min(prev + 1, maxQuantity));
    };

    const decrementQuantity = () => {
        setQuantity(prev => Math.max(prev - 1, minQuantity));
    };

    return (
        <div className={cn("space-y-2", className)} {...props}>
            {/* Selector de cantidad */}
            {showQuantitySelector && (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={decrementQuantity}
                        disabled={quantity <= minQuantity}
                        className="h-8 w-8 p-0"
                    >
                        <Minus size={14} />
                    </Button>
                    
                    <span className="w-12 text-center text-sm font-medium">
                        {quantity}
                    </span>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={incrementQuantity}
                        disabled={quantity >= maxQuantity}
                        className="h-8 w-8 p-0"
                    >
                        <Plus size={14} />
                    </Button>
                </div>
            )}

            {/* Botón de agregar al carrito */}
            <Button
                variant={variant}
                size={size}
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full"
            >
                {isAdding ? (
                    <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Agregando...
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <ShoppingCart size={16} />
                        {children || (inCart ? 'Agregar más' : 'Agregar al carrito')}
                    </div>
                )}
            </Button>

            {/* Indicador si ya está en el carrito */}
            {inCart && (
                <p className="text-xs text-green-600 text-center">
                    ✓ Ya tienes {currentQuantity} en tu carrito
                </p>
            )}
        </div>
    );
}

export default AddToCartButton;
