import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    idCart: null,
    items: [],
    isLoading: false,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action) {
            state.idCart = action.payload.idCart;
            state.items = action.payload.items || [];
            state.error = null;
        },
        setCartLoading(state, action) {
            state.isLoading = action.payload;
        },
        setCartError(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        addItem: (state, action) => {
            const { product, quantity, idItem } = action.payload;

            // Valida que los datos requeridos estén presentes
            if (!product || !product.idProduct || typeof quantity !== 'number') {
                console.error("cartSlice.addItem - Invalid item data:", action.payload);
                return;
            }
            
            const existing = state.items.find(
                (item) => item.product?.idProduct === product.idProduct
            );
            
            if (existing) {
                existing.quantity += quantity;
            } else {
                state.items.push({ 
                    product, 
                    quantity, 
                    idItem,
                    id: idItem || `temp-${Date.now()}-${product.idProduct}`
                });
            }
            state.error = null;
        },
        updateQuantity(state, action) {
            const { idProduct, quantity } = action.payload;
            const item = state.items.find((item) => 
                item.product?.idProduct === idProduct
            );
            if (item && quantity > 0) {
                item.quantity = quantity;
                state.error = null;
            }
        },
        removeItem(state, action) {
            const { idProduct } = action.payload;
            state.items = state.items.filter((item) => 
                item.product?.idProduct !== idProduct
            );
            state.error = null;
        },
        clearCart: (state) => {
            state.items = [];
            state.error = null;
        },
    },
});

// Selectores memoizados para optimizar rendimiento
export const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.items
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => {
        const price = item.product?.price || 0;
        return total + (price * item.quantity);
    }, 0)
);

export const selectCartSubtotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, item) => {
        const price = item.product?.price || 0;
        return total + (price * item.quantity);
    }, 0)
);

export const selectCartIsEmpty = createSelector(
    [selectCartItems],
    (items) => items.length === 0
);

export const selectCartById = createSelector(
    [selectCart],
    (cart) => cart.idCart
);

export const { 
    setCart, 
    setCartLoading, 
    setCartError, 
    addItem, 
    updateQuantity, 
    removeItem, 
    clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
