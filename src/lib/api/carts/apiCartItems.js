import 'server-only'
import { apiRequest } from '@/lib/apiRequest';

const BASE_URL = 'http://localhost:8081/cart-items';

export async function getItem(idItem) { // Obtiene un item por su ID
    return await apiRequest(`${BASE_URL}/${idItem}`, 'GET', null, 'application/json', false);
}

export async function updateQuantity(idItem, quantity) { // Actualiza la cantidad de un item en el carrito
    return await apiRequest(`${BASE_URL}/quantity/${idItem}`, 'PUT', quantity, 'application/json', false);
}

export async function getItemsByCart(idCart) { 
    return await apiRequest(`${BASE_URL}/cart/${idCart}/items`, 'GET', null, 'application/json', false);
}

export async function calculateTotalByItem(idItem) {
    return await apiRequest(`${BASE_URL}/total-by-item/${idItem}`, 'GET', null, 'application/json', false);
}