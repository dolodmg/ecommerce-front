import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8081/carts';

export async function getCarts() { // Obtiene la lista de todos los carritos
    return await apiRequest(`${BASE_URL}/all`, 'GET', null, 'application/json', false);
}

export async function getCart(idCart) { // Obtiene un carrito por su ID
    return await apiRequest(`${BASE_URL}/${idCart}`, 'GET', null, 'application/json', false);
}

export async function getCartByUserId(idUser) { // Obtiene un carrito por el ID del usuario
    return await apiRequest(`${BASE_URL}/cart-by-user/${idUser}`, 'GET', null, 'application/json', false);
}

export async function createCart(cart) { // Crea un nuevo carrito
    return await apiRequest(`${BASE_URL}`, 'POST', cart, 'application/json', false);
}   

export async function addItemToCart(idCart, item) { // Añade un item al carrito
    return await apiRequest(`${BASE_URL}/add-item/${idCart}`, 'POST', item, 'application/json', false);
}

export async function removeItemFromCart(idCart, idProduct) { // Elimina un item del carrito
    return await apiRequest(`${BASE_URL}/${idCart}/items/${idProduct}`, 'DELETE', null, 'application/json', false);
}

export async function clearCart(idCart) { // Limpia todos los ítems de un carrito
    return await apiRequest(`${BASE_URL}/clear/${idCart}`, 'PATCH', null, 'application/json', false);
}