'use client';
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartData } from "@/hooks/useCartData";
import CartIcon from "./components/CartIcon";
import CartItemList from "./components/CartItemList";
import CartSummary from "./components/CartSummary";
import { cn } from "@/lib/utils";

/**
 * Componente principal del carrito que integra todos los subcomponentes
 * Responsabilidad única: Orquestar la visualización del carrito en un panel lateral
 */
export function CartSheet({ 
    trigger,
    onCheckout,
    className,
    ...props 
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { itemsCount, isEmpty } = useCartData();

    const handleCheckout = (summaryData) => {
        setIsOpen(false); // Cerrar el sheet
        
        if (onCheckout) {
            onCheckout(summaryData);
        } else {
            // Navegación por defecto al checkout
            // Aquí podrías usar router.push('/checkout')
            console.log('Proceeding to checkout:', summaryData);
        }
    };

    const defaultTrigger = (
        <CartIcon 
            className="hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(true)}
        />
    );

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} {...props}>
            <SheetTrigger asChild>
                {trigger || defaultTrigger}
            </SheetTrigger>
            
            <SheetContent 
                side="right" 
                className={cn("w-full sm:w-[400px] flex flex-col", className)}
            >
                <SheetHeader className="flex-shrink-0">
                    <SheetTitle className="flex items-center justify-between">
                        <span>Carrito de Compras</span>
                        {!isEmpty && (
                            <span className="text-sm font-normal text-gray-500">
                                ({itemsCount} {itemsCount === 1 ? 'producto' : 'productos'})
                            </span>
                        )}
                    </SheetTitle>
                </SheetHeader>

                {/* Lista de productos con scroll */}
                <ScrollArea className="flex-1 -mx-6 px-6">
                    <CartItemList 
                        emptyMessage="Tu carrito está vacío. ¡Agrega algunos productos!"
                        className="mt-4"
                    />
                </ScrollArea>

                {/* Resumen del carrito */}
                <div className="flex-shrink-0 border-t border-gray-100 mt-4">
                    <CartSummary 
                        onCheckout={handleCheckout}
                        showClearButton={true}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default CartSheet;