'use server';
import { getAll, getEditorial } from '@/lib/api/products/apiEditorials';

export async function getAll() {
    const { data } = await getAll();
    return { data };
}

export async function getEditorial(idEditorial) {
    const { data } = await getEditorial(idEditorial);
    return { data };
}