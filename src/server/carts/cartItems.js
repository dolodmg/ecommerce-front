'use server'
import {getItem, updateQuantity, getItemsByCart, calculateTotalByItem} from "@/lib/api/carts/apiCartItems";

export async function getItemAction(idItem) {
    const { data } = await getItem(idItem);
    return data;
}

export async function updateQuantityAction(idItem, quantity) {
    const { data } = await updateQuantity(idItem, quantity);
    return data;
}

export async function getItemsByCartAction(idCart) {
    const { data } = await getItemsByCart(idCart);
    return data;
}

export async function calculateTotalByItemAction(idItem) {
    const { data } = await calculateTotalByItem(idItem);
    return data;
}
