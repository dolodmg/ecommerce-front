import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8084/orders';

export async function getAll() { // Obtiene la lista de todas las órdenes
    return await apiRequest(`${BASE_URL}/all`, 'GET', null, 'application/json', false);
}

export async function getOrder(idOrder) { // Obtiene una orden por su ID
    return await apiRequest(`${BASE_URL}/${idOrder}`, 'GET', null, 'application/json', false);
}

export async function getOrderByUserId(idUser) { // Obtiene una orden por el ID del usuario
    return await apiRequest(`${BASE_URL}/user/${idUser}`, 'GET', null, 'application/json', false);
}

export async function getOrdersByStatus(status) { // Obtiene órdenes por su estado
    return await apiRequest(`${BASE_URL}/status`, 'GET', status, 'application/json', false);
}

export async function getOrdersByDateRange(start, end) { // Obtiene órdenes por rango de fechas
    return await apiRequest(`${BASE_URL}/date-range`, 'GET', { start, end }, 'application/json', false);
}

export async function createOrder(order) { // Crea una nueva orden
    return await apiRequest(`${BASE_URL}/post`, 'POST', order, 'application/json', false);
}

export async function changeStatus(idOrder, status) { // Cambia el estado de una orden
    return await apiRequest(`${BASE_URL}/${idOrder}/status`, 'PUT', status, 'application/json', false);
}

export async function deleteOrder(idOrder) { // Elimina lógicamente una orden por su ID
    return await apiRequest(`${BASE_URL}/${idOrder}`, 'DELETE', null, 'application/json', false);
}