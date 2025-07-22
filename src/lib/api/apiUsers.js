import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8083/users';

export async function getAll() { // Obtiene la lista de todos los usuarios
    return await apiRequest(`${BASE_URL}/get/all`, 'GET', null, 'application/json', false);
}

export async function getUser(idUser) { // Obtiene un usuario por su ID
    return await apiRequest(`${BASE_URL}/get/${idUser}`, 'GET', null, 'application/json', false);
}

