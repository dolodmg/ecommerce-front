import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8082/brands';

export async function getAll() { //Obtiene la lista de todas las marcas
    return await apiRequest(`${BASE_URL}/get/all`, 'GET', null, 'application/json', false);
}

export async function getBrand(idBrand) { //Obtiene una marca por su ID
    return await apiRequest(`${BASE_URL}/get/${idBrand}`, 'GET', null, 'application/json', false);
}

