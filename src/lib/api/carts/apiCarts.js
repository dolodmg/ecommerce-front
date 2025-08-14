import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8081/carts';

export async function getCarts() {
    return await apiRequest(`${BASE_URL}/all`, 'GET', null, 'application/json', false);
}

export async function getCart(idCart) {
    return await apiRequest(`${BASE_URL}/${idCart}`, 'GET', null, 'application/json', false);
}

export async function getCartByUserId(idUser) {
    return await apiRequest(`${BASE_URL}/cart-by-user/${idUser}`, 'GET', null, 'application/json', false);
}

export async function createCart(cart) {
    return await apiRequest(`${BASE_URL}`, 'POST', cart, 'application/json', false);
}   

export async function addItemToCart(idCart, item) {
    return await apiRequest(`${BASE_URL}/add-item/${idCart}`, 'POST', item, 'application/json', false);
}

export async function removeItemFromCart(idCart, idProduct) {
    return await apiRequest(`${BASE_URL}/${idCart}/items/${idProduct}`, 'DELETE', null, 'application/json', false);
}

export async function clearCart(idCart) {
    return await apiRequest(`${BASE_URL}/clear/${idCart}`, 'PATCH', null, 'application/json', false);
}
