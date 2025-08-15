'use server';
import { getCarts, getCart, getCartByUserId, createCart, addItemToCart, removeItemFromCart, clearCart } from '@/lib/api/carts/apiCarts';

export async function getCartsAction() {
    const { data } = await getCarts();
    return data;
}

export async function getCartAction(idCart) {
    const { data } = await getCart(idCart);
    return data;
}

export async function getCartByUserIdAction(idUser) {
    const { data } = await getCartByUserId(idUser);
    return data;
}

export async function createCartAction(cart) {
    const { data } = await createCart(cart);
    return data;
}

export async function addItemToCartAction(idCart, item) {
    const { data } = await addItemToCart(idCart, item);
    return data;
}

export async function removeItemFromCartAction(idCart, idProduct) {
    const { data } = await removeItemFromCart(idCart, idProduct);
    return data;
}

export async function clearCartAction(idCart) {
    const { data } = await clearCart(idCart);
    return data;
}