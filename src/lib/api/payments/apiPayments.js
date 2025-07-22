import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8085/payments';

export async function getAll() { // Obtiene la lista de todos los pagos
    return await apiRequest(`${BASE_URL}/all`, 'GET', null, 'application/json', false);
}

export async function getPayment(idPayment) { // Obtiene un pago por su ID
    return await apiRequest(`${BASE_URL}/${idPayment}`, 'GET', null, 'application/json', false);
}

export async function getPaymentsByDateRange(startDate, endDate) { // Obtiene pagos por rango de fechas
    return await apiRequest(`${BASE_URL}/get/date`, 'GET', { startDate, endDate }, 'application/json', false);
}

export async function getPaymentsByUser(idUser) { // Obtiene los pagos de un usuario por su ID
    return await apiRequest(`${BASE_URL}/user/${idUser}`, 'GET', null, 'application/json', false);
}

export async function getPaymentsByStatus(status) { // Obtiene pagos por su estado
    return await apiRequest(`${BASE_URL}/status`, 'GET', status, 'application/json', false);
}

export async function getPaymentsByPriceRange(minPrice, maxPrice) { // Obtiene pagos por rango de precios
    return await apiRequest(`${BASE_URL}/price`, 'GET', { minPrice, maxPrice }, 'application/json', false);
}

export async function createPayment(payment) { // Crea un nuevo pago
    return await apiRequest(`${BASE_URL}/post`, 'POST', payment, 'application/json', false);
}

export async function changeStatus(idPayment, status) { // Cambia el estado de un pago
    return await apiRequest(`${BASE_URL}/${idPayment}`, 'PUT', status, 'application/json', false);
}

export async function deletePayment(idPayment) { // Elimina lógicamente un pago por su ID
    return await apiRequest(`${BASE_URL}/${idPayment}`, 'DELETE', null, 'application/json', false);
}