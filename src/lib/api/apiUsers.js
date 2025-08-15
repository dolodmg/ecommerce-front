import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8083/users';

export async function getAll() {
    return await apiRequest(`${BASE_URL}/get/all`, 'GET', null, 'application/json', false);
}

export async function getUser(idUser) {
    return await apiRequest(`${BASE_URL}/get/${idUser}`, 'GET', null, 'application/json', false);
}

