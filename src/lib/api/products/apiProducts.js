import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8082/products';

export async function getProducts() { //Obtiene la lista de todos los productos
    return await apiRequest(`${BASE_URL}/get/all`, 'GET', null, 'application/json', false);
}

export async function getProductById(idProduct) { //Obtiene un producto por su ID
    return await apiRequest(`${BASE_URL}/get/${idProduct}`, 'GET', null, 'application/json', false);
}

export async function updateStock(idProduct, quantity) { //Actualiza el stock de un producto 
    return await apiRequest(`${BASE_URL}/${idProduct}/stock`, 'PUT', quantity, 'application/json', false);
}

export async function getFiltered(category, minPrice, maxPrice, genre, albumFormat) { //Obtiene productos por rango de precio
    const queryParams = [];
    if (category && category !== '') queryParams.push(`category=${category}`);
    if (minPrice && minPrice !== '') queryParams.push(`minPrice=${minPrice}`);
    if (maxPrice && maxPrice !== '') queryParams.push(`maxPrice=${maxPrice}`);
    if (genre && genre !== '') queryParams.push(`genre=${genre}`);
    if (albumFormat && albumFormat !== '') queryParams.push(`albumFormat=${albumFormat}`);
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    return await apiRequest(`${BASE_URL}/get/filtered${queryString}`, 'GET', null, 'application/json', false);
}
