import { useRouter } from "next/navigation";
import { useCartData } from "@/hooks/useCartData";
import { useCartActions } from "@/hooks/useCartActions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useOrders } from "@/hooks/useOrders";

/**
 * Componente que muestra el resumen del carrito (totales y acciones)
 * Responsabilidad única: Mostrar información de totales y crear orden para redirección
 */
export function CartSummary({ 
    onOrderCreated,
    showClearButton = true,
    className,
    ...restProps 
}) {
    const { 
        total, 
        subtotal, 
        itemsCount, 
        isEmpty,
        isLoading,
        cartId: idCart
    } = useCartData();
    
    const { clearCartItems, isOperating } = useCartActions();
    const { createOrder, isCreatingOrder } = useOrders();
    const router = useRouter();

    // Filtrar props para evitar pasar props no válidas al DOM
    const { onCheckout, ...domProps } = restProps;

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

    const handleCheckout = async () => {
        // Por ahora usamos un idUser hardcodeado, en el futuro se puede obtener del contexto de usuario
        const idUser = 1;
        
        if (!idCart) {
            console.error('No se puede proceder al checkout: ID del carrito no disponible');
            return;
        }
        if (!idUser) {
            console.error('No se puede proceder al checkout: ID del usuario no disponible');
            return;
        }
        
        try {
            const orderData = await createOrder(idCart, idUser);
            console.log('✅ Orden creada exitosamente:', orderData);
            
            // Notificar al componente padre que se creó la orden
            if (onOrderCreated) {
                onOrderCreated(orderData);
            }
            
            // Redirigir a la página de pagos con el ID de la orden
            router.push(`/payments/${orderData.idOrder}`);
            
        } catch (error) {
            console.error('Error al procesar el checkout:', error);
        }
    };

    if (isEmpty) {
        return (
            <div className={cn("p-4 text-center", className)} {...domProps}>
                <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
        );
    }

    const isActionDisabled = isLoading || isOperating || isEmpty || isCreatingOrder;

    return (
        <div className={cn("p-4 space-y-4", className)} {...domProps}>
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
                    {isCreatingOrder ? 'Creando orden...' : 
                     isLoading ? 'Cargando...' : 
                     'Iniciar compra'}
                </Button>

                {showClearButton && (
                    <Button
                        variant="outline"
                        onClick={handleClearCart}
                        disabled={isActionDisabled}
                        className="w-full"
                    >
                        Vaciar carrito
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CartSummary;
