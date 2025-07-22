'use server';
import { getAll, getBrand  } from '@/lib/api/products/apiBrands';

export async function getAll() {
    const { data } = await getAll();
    return data;
}

export async function getBrand(idBrand) {
    const { data } = await getBrand(idBrand);
    return data;
}