import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8084/best-sellers';

export async function getBestSellers(category) {
    const url = category 
        ? `${BASE_URL}?category=${encodeURIComponent(category)}` 
        : BASE_URL;

    return await apiRequest(url, 'GET', null, 'application/json', false);
}