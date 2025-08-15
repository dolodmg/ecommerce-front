'use server'
import { getItemById } from "@/lib/api/orders/apiOrderItems"

export async function getItemByIdAction(idItem) {
    const { data } = await getItemById(idItem);
    return data;
}
