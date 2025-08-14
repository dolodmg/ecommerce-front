import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8082/editorials';

export async function getAll() {
    return await apiRequest(`${BASE_URL}/get/all`, 'GET', null, 'application/json', false);
}

export async function getEditorial(idEditorial) {
    return await apiRequest(`${BASE_URL}/get/${idEditorial}`, 'GET', null, 'application/json', false);
}

