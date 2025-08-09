'use server'
import { getAll, getOrder, getOrderByUserId, getOrdersByStatus, getOrdersByDateRange, createOrder, changeStatus, deleteOrder } from '@/lib/api/orders/apiOrders';

export async function getAllAction() {
    const { data } = await getAll();
    return data;
}

export async function getOrderAction(idOrder) {
    const { data } = await getOrder(idOrder);
    return data;
}

export async function getOrderByUserIdAction(idUser) {
    const { data } = await getOrderByUserId(idUser);
    return data;
}

export async function getOrdersByStatusAction(status) {
    const { data } = await getOrdersByStatus(status);
    return data;
}

export async function getOrdersByDateRangeAction(start, end) {
    const { data } = await getOrdersByDateRange(start, end);
    return data;
}

export async function createOrderAction(order) {
    const { data } = await createOrder(order);
    return data;
}

export async function changeStatusAction(idOrder, status) {
    const { data } = await changeStatus(idOrder, status);
    return data;
}

export async function deleteOrderAction(idOrder) {
    const { data } = await deleteOrder(idOrder);
    return data;
}
