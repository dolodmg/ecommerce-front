import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8085/payments';

export async function getAll() {
    return await apiRequest(`${BASE_URL}/all`, 'GET', null, 'application/json', false);
}

export async function getPayment(idPayment) {
    return await apiRequest(`${BASE_URL}/${idPayment}`, 'GET', null, 'application/json', false);
}

export async function getPaymentsByDateRange(startDate, endDate) {
    return await apiRequest(`${BASE_URL}/get/date`, 'GET', { startDate, endDate }, 'application/json', false);
}

export async function getPaymentsByUser(idUser) {
    return await apiRequest(`${BASE_URL}/user/${idUser}`, 'GET', null, 'application/json', false);
}

export async function getPaymentsByStatus(status) {
    return await apiRequest(`${BASE_URL}/status`, 'GET', status, 'application/json', false);
}

export async function getPaymentsByPriceRange(minPrice, maxPrice) {
    return await apiRequest(`${BASE_URL}/price`, 'GET', { minPrice, maxPrice }, 'application/json', false);
}

export async function changeStatus(idPayment, status) { // Cambia el estado de un pago
    return await apiRequest(`${BASE_URL}/${idPayment}`, 'PUT', status, 'application/json', false);
}

export async function deletePayment(idPayment) { // Elimina lógicamente un pago por su ID
    return await apiRequest(`${BASE_URL}/${idPayment}`, 'DELETE', null, 'application/json', false);
}

export async function processPaymentWithMercadoPago(paymentData) { // Procesa un pago con Mercado Pago
    return await apiRequest(`${BASE_URL}/process-mp`, 'POST', paymentData, 'application/json', false);
}
