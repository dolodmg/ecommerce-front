import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8082/albums';

export async function getAll() {
    return await apiRequest(`${BASE_URL}/all`, 'GET', null, 'application/json', false);
}

export async function getAlbum(idProduct) {
    return await apiRequest(`${BASE_URL}/${idProduct}`, 'GET', null, 'application/json', false);
}

export async function getAlbumsByArtist(firstName, lastName) {
    return await apiRequest(`${BASE_URL}/get/by-artist`, 'GET', { firstName, lastName }, 'application/json', false);
}

export async function getAlbumsByFormat(format) {
    return await apiRequest(`${BASE_URL}/get/by-format`, 'GET', format, 'application/json', false);
}

export async function getAlbumsByPriceRange(minPrice, maxPrice) {
    return await apiRequest(`${BASE_URL}/get/by-price?minPrice=${minPrice}&maxPrice=${maxPrice}`, 'GET', null, 'application/json', false);
}

export async function createAlbum(albumData) { //Crea un nuevo álbum
    return await apiRequest(`${BASE_URL}/post`, 'POST', albumData, 'application/json', false);
}

export async function editAlbum(idProduct, albumData) { //Actualiza un álbum existente
    return await apiRequest(`${BASE_URL}/edit/${idProduct}`, 'PUT', albumData, 'application/json', false);
}

export async function deleteAlbum(idProduct) { //Elimina logicamente un álbum por su ID
    return await apiRequest(`${BASE_URL}/delete/${idProduct}`, 'DELETE', null, 'application/json', false);
}

export async function getFormats() {
    return await apiRequest(`${BASE_URL}/get/formats`, 'GET', null, 'application/json', false);
}

export async function getAlbumGenres() {
    return await apiRequest(`${BASE_URL}/get/genres`, 'GET', null, 'application/json', false);
}
