import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartActions } from "@/hooks/useCartActions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";

const roboto = Roboto(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export function CartItem({ 
    item,
    showImage = true,
    showControls = true,
    className,
    ...props 
}) {
    const { 
        incrementQuantity, 
        decrementQuantity, 
        removeItemFromCart,
        isOperating 
    } = useCartActions();
    
    const [isUpdating, setIsUpdating] = useState(false);

    const { product, quantity } = item;
    
    // Extraer datos del producto de forma defensiva
    const idProduct = product?.idProduct || item.idProduct;
    const name = product?.name || `Producto ${idProduct}`;
    const price = product?.price || 0;
    const stock = product?.stock || 0;
    const image = product?.image;
    const isProductDataIncomplete = !product?.name || !product?.price;

    // Calcular subtotal del item
    const subtotal = price * quantity;

    // Manejar incremento de cantidad
    const handleIncrement = async () => {
        setIsUpdating(true);
        try {
            await incrementQuantity(idProduct);
        } catch (error) {
            console.error('Error incrementing quantity:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    // Manejar decremento de cantidad
    const handleDecrement = async () => {
        setIsUpdating(true);
        try {
            await decrementQuantity(idProduct);
        } catch (error) {
            console.error('Error decrementing quantity:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    // Manejar eliminación del item
    const handleRemove = async () => {
        setIsUpdating(true);
        try {
            await removeItemFromCart(idProduct);
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const isLoading = isOperating || isUpdating;

    return (
        <div 
            className={cn(
                "flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0",
                isLoading && "opacity-50 pointer-events-none",
                className
            )}
            {...props}
        >
            {/* Imagen del producto */}
            {showImage && (
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">Sin imagen</span>
                        </div>
                    )}
                </div>
            )}

            {/* Información del producto */}
            <div className={`${roboto.className} flex-1 min-w-0`}>
                <h4 className="text-sm font-light text-zinc-800 truncate">
                    {name}
                    {isProductDataIncomplete && (
                        <span className="ml-2 text-xs text-amber-600">(Cargando...)</span>
                    )}
                </h4>
                <p className="text-sm font-medium text-zinc-700">
                    ${subtotal > 0 ? subtotal.toFixed(2) : '0.00'}
                </p>
            </div>

            {/* Controles de cantidad y eliminar */}
            {showControls && (
                <div className="flex items-center gap-2">
                    {/* Controles de cantidad */}
                    <div className="grid grid-cols-3 items-center border rounded-md w-[96px] h-8">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDecrement}
                            disabled={isLoading || quantity <= 1}
                            className="h-full w-full p-0 flex items-center justify-center"
                        >
                            <Minus size={14} />
                        </Button>
                        <span className="w-full text-center text-sm font-normal">
                            {quantity}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleIncrement}
                            disabled={isLoading || quantity >= stock}
                            className="h-full w-full p-0 flex items-center justify-center"
                        >
                            <Plus size={14} />
                        </Button>
                    </div>
                    {/* Botón eliminar */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemove}
                        disabled={isLoading}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )}
        </div>
    );
}

export default CartItem;
