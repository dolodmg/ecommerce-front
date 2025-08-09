// Ejemplo de cómo usar el carrito en una página de producto
'use client';
import { AddToCartButton } from "@/components/cart";

export function ProductPageExample({ product }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del producto */}
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-green-600">
            ${product.price}
          </p>
          <p className="text-gray-600">{product.description}</p>
          
          {/* Botón de agregar al carrito */}
          <AddToCartButton 
            product={product}
            showQuantitySelector={true}
            maxQuantity={product.stock}
          />
        </div>
      </div>
    </div>
  );
}
