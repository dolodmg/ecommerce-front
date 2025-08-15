# Sistema de Carrito de Compras - Documentación

## Arquitectura

El sistema de carrito está construido siguiendo principios de **separación de responsabilidades** y **componentes de un solo uso**:

### Estructura de archivos
```
src/
├── components/cart/
│   ├── index.js                    # Barrel exports
│   ├── CartProvider.jsx            # Provider para inicialización automática
│   ├── sheet.jsx                   # Panel lateral principal
│   ├── components/                 # Componentes especializados
│   │   ├── CartIcon.jsx            # Ícono con contador
│   │   ├── CartItem.jsx            # Item individual del carrito
│   │   ├── CartItemList.jsx        # Lista de items
│   │   └── CartSummary.jsx         # Resumen y checkout
│   ├── ui/                         # Componentes de interfaz
│   │   └── AddToCartButton.jsx     # Botón para agregar productos
│   └── examples/
│       └── ProductPageExample.jsx  # Ejemplo de uso
├── hooks/
│   ├── useCartData.js              # Hook para datos (solo lectura)
│   ├── useCartActions.js           # Hook para acciones
│   └── useCart.js                  # Hook combinado (compatibilidad)
└── store/
    └── cartSlice.js                # Estado Redux con selectores
```

## Hooks Principales

### 1. useCartData (Solo lectura)
```javascript
import { useCartData } from '@/hooks/useCartData';

function MyComponent() {
  const { 
    items,           // Array de items del carrito
    itemsCount,      // Número total de items
    total,           // Total del carrito
    isEmpty,         // Boolean si está vacío
    isInCart,        // Función para verificar si un producto está
    getItemQuantity  // Función para obtener cantidad de un producto
  } = useCartData();
}
```

### 2. useCartActions (Solo acciones)
```javascript
import { useCartActions } from '@/hooks/useCartActions';

function MyComponent() {
  const { 
    addItemToCart,       // Agregar producto
    removeItemFromCart,  // Remover producto
    updateItemQuantity,  // Actualizar cantidad
    clearCartItems,      // Vaciar carrito
    incrementQuantity,   // Incrementar en 1
    decrementQuantity    // Decrementar en 1
  } = useCartActions();

  const handleAddProduct = async () => {
    try {
      await addItemToCart(product, 2);
      console.log('Producto agregado!');
    } catch (error) {
      console.error('Error:', error);
    }
  };
}
```

## Componentes Principales

### 1. CartProvider
```javascript
// En app/provider.js o layout
import { CartProvider } from '@/components/cart';

<CartProvider userId={1} autoInitialize={true}>
  {children}
</CartProvider>
```

### 2. CartSheet (Panel lateral)
```javascript
import { CartSheet } from '@/components/cart';

// Uso básico
<CartSheet />

// Con trigger personalizado
<CartSheet 
  trigger={<button>Abrir Carrito</button>}
  onCheckout={(data) => router.push('/checkout')}
/>
```

### 3. AddToCartButton
```javascript
import { AddToCartButton } from '@/components/cart';

<AddToCartButton 
  product={product}
  showQuantitySelector={true}
  maxQuantity={product.stock}
  variant="default"
  size="lg"
>
  Agregar al Carrito
</AddToCartButton>
```

### 4. CartItem (Item individual)
```javascript
import { CartItem } from '@/components/cart';

<CartItem 
  item={cartItem}
  showImage={true}
  showControls={true}
/>
```

## Ejemplos de Uso

### Página de Producto Completa
```javascript
'use client';
import { AddToCartButton, useCartData } from '@/components/cart';

export function ProductPage({ product }) {
  const { isInCart, getItemQuantity } = useCartData();
  
  const inCart = isInCart(product.idProduct);
  const currentQuantity = getItemQuantity(product.idProduct);

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      
      {inCart && (
        <p>Ya tienes {currentQuantity} en tu carrito</p>
      )}
      
      <AddToCartButton 
        product={product}
        maxQuantity={product.stock}
        showQuantitySelector={true}
      />
    </div>
  );
}
```

### Navbar con Carrito
```javascript
import { CartSheet } from '@/components/cart';

export function Navbar() {
  return (
    <nav>
      <div>Logo</div>
      <div>Links</div>
      <div>
        <CartSheet />
      </div>
    </nav>
  );
}
```

### Página de Checkout
```javascript
'use client';
import { useCartData } from '@/components/cart';

export function CheckoutPage() {
  const { items, total, isEmpty } = useCartData();

  if (isEmpty) {
    return <div>Tu carrito está vacío</div>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      {items.map(item => (
        <div key={item.product.idProduct}>
          {item.product.name} x {item.quantity}
        </div>
      ))}
      <div>Total: ${total}</div>
    </div>
  );
}
```

## Flujo de Datos

1. **Inicialización**: CartProvider inicializa automáticamente el carrito al cargar
2. **Agregar Item**: AddToCartButton → useCartActions → Redux → Backend
3. **Modificar Cantidad**: CartItem → useCartActions → Redux → Backend
4. **Visualización**: CartSheet → useCartData → Redux (selectores memoizados)

## Características Técnicas

### ✅ Buenas Prácticas Implementadas

- **Separación de responsabilidades**: Cada componente tiene una función específica
- **Hooks especializados**: Datos separados de acciones
- **Selectores memoizados**: Optimización de renders con createSelector
- **UI Optimista**: Actualizaciones inmediatas en UI, sincronización en background
- **Manejo de errores**: Try/catch con rollback en caso de fallo
- **Componentes reutilizables**: Configurables mediante props
- **TypeScript ready**: Estructura preparada para TypeScript

### 🔧 Optimizaciones

- **Memoización**: Selectores Redux memoizados para evitar re-renders innecesarios
- **Lazy loading**: Componentes cargados solo cuando se necesitan
- **Debouncing**: Para actualizaciones de cantidad (se puede implementar)
- **Cache local**: Estado persiste durante la sesión

## Extensibilidad

### Agregar nuevas funcionalidades
```javascript
// Nuevo hook para wishlist
export function useWishlist() {
  // Similar estructura a useCartActions
}

// Nuevo componente
export function WishlistButton({ product }) {
  // Similar a AddToCartButton
}
```

### Personalización de estilos
Todos los componentes aceptan className y props adicionales para customización completa.

## Migración desde implementación anterior

El hook `useCart` mantiene compatibilidad hacia atrás:
```javascript
// Código anterior (sigue funcionando)
const { cart, add, remove, update } = useCart();

// Nuevo código (recomendado)
const { items, total } = useCartData();
const { addItemToCart } = useCartActions();
```
