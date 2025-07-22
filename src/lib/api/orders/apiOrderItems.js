import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8084/orderitems';

export async function getItemById(idItem) { // Obtiene un item por su ID
    return await apiRequest(`${BASE_URL}/${idItem}`, 'GET', null, 'application/json', false);
}