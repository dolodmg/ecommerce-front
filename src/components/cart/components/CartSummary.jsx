import { useCartData } from "@/hooks/useCartData";
import { useCartActions } from "@/hooks/useCartActions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * Componente que muestra el resumen del carrito (totales y acciones)
 * Responsabilidad única: Mostrar información de totales y botones de acción
 */
export function CartSummary({ 
    onCheckout,
    showClearButton = true,
    className,
    ...props 
}) {
    const { 
        total, 
        subtotal, 
        itemsCount, 
        isEmpty,
        isLoading 
    } = useCartData();
    
    const { clearCartItems, isOperating } = useCartActions();

    // Calcular impuestos (ejemplo: 10%)
    const taxRate = 0.10;
    const taxes = subtotal * taxRate;

    const handleClearCart = async () => {
        if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            try {
                await clearCartItems();
            } catch (error) {
                console.error('Error clearing cart:', error);
            }
        }
    };

    const handleCheckout = () => {
        if (onCheckout) {
            onCheckout({
                items: itemsCount,
                subtotal,
                taxes,
                total: subtotal + taxes
            });
        }
    };

    if (isEmpty) {
        return (
            <div className={cn("p-4 text-center", className)} {...props}>
                <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
        );
    }

    const isActionDisabled = isLoading || isOperating || isEmpty;

    return (
        <div className={cn("p-4 space-y-4", className)} {...props}>
            {/* Resumen de cantidades */}
            <div className="text-sm text-gray-600">
                {itemsCount} {itemsCount === 1 ? 'producto' : 'productos'} en tu carrito
            </div>

            <Separator />

            {/* Desglose de precios */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Impuestos ({(taxRate * 100)}%):</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${(subtotal + taxes).toFixed(2)}</span>
                </div>
            </div>

            <Separator />

            {/* Botones de acción */}
            <div className="space-y-2">
                <Button
                    onClick={handleCheckout}
                    disabled={isActionDisabled}
                    className="w-full"
                    size="lg"
                >
                    {isLoading ? 'Cargando...' : 'Iniciar Compra'}
                </Button>

                {showClearButton && (
                    <Button
                        variant="outline"
                        onClick={handleClearCart}
                        disabled={isActionDisabled}
                        className="w-full"
                    >
                        Vaciar Carrito
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CartSummary;
