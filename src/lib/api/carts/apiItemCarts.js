import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8081';

export async function getItem(idItem) { // Obtiene un item por su ID
    return await apiRequest(`${BASE_URL}/cart-items/${idItem}`, 'GET', null, 'application/json', false);
}

export async function updateQuantity(idItem, quantity) { // Actualiza la cantidad de un item en el carrito
    return await apiRequest(`${BASE_URL}/cart-items/${idItem}`, 'PATCH', quantity, 'application/json', false);
}

export async function getItemsByCart(idCart) { 
    return await apiRequest(`${BASE_URL}/cart-items/cart/${idCart}/items`, 'GET', null, 'application/json', false);
}