'use server';
import { getBestSellers } from "@/lib/api/orders/apiBestSellers";

export async function getBestSellersAction(category) {
    const { data } = await getBestSellers(category);
    return data;
}