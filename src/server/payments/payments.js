'use server'
import { getAll, getPayment, getPaymentsByDateRange, getPaymentsByUser, getPaymentsByStatus, getPaymentsByPriceRange, changeStatus, deletePayment, processPaymentWithMercadoPago } from '@/lib/api/payments/apiPayments';

export async function getAllPaymentsAction() {
    const { data } = await getAll();
    return data;
}

export async function getPaymentAction(idPayment) {
    const { data } = await getPayment(idPayment);
    return data;
}

export async function getPaymentsByDateRangeAction(startDate, endDate) {
    const { data } = await getPaymentsByDateRange(startDate, endDate);
    return data;
}

export async function getPaymentsByUserAction(idUser) {
    const { data } = await getPaymentsByUser(idUser);
    return data;
}

export async function getPaymentsByStatusAction(status) {
    const { data } = await getPaymentsByStatus(status);
    return data;
}

export async function getPaymentsByPriceRangeAction(minPrice, maxPrice) {
    const { data } = await getPaymentsByPriceRange(minPrice, maxPrice);
    return data;
}

export async function changePaymentStatusAction(idPayment, status) {
    const { data } = await changeStatus(idPayment, status);
    return data;
}

export async function deletePaymentAction(idPayment) {
    const { data } = await deletePayment(idPayment);
    return data;
}

export async function processPaymentAction(paymentData) {
    try {
        const { data } = await processPaymentWithMercadoPago(paymentData);
        return data;
    } catch (error) {
        console.error('Error processing payment with Mercado Pago:', error);
        throw error;
    }
}