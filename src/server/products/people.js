'use server';
import { getPeople, getPersonById } from '@/lib/api/products/apiPeople';

export async function getPeople() {
    const { data } = await getPeople();
    return data;
}

export async function getPersonById(idPerson) {
    const { data } = await getPersonById(idPerson);
    return data;
}