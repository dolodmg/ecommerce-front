import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8082/people';

export async function getPeople() { // Obtiene la lista de todas las personas
    return await apiRequest(`${BASE_URL}/get/all`, 'GET', null, 'application/json', false);
}

export async function getPersonById(idPerson) { // Obtiene una persona por su ID
    return await apiRequest(`${BASE_URL}/get/${idPerson}`, 'GET', null, 'application/json', false);
}
