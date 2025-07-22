import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8082/albums';

export async function getAll() { //Obtiene la lista de todos los albums
    return await apiRequest(`${BASE_URL}/all`, 'GET', null, 'application/json', false);
}

export async function getAlbum(idProduct) { //Obtiene un álbum por su ID
    return await apiRequest(`${BASE_URL}/${idProduct}`, 'GET', null, 'application/json', false);
}

export async function getAlbumsByArtist(firstName, lastName) { //Obtiene los álbumes de un artista por su nombre y apellido
    return await apiRequest(`${BASE_URL}/get/by-artist`, 'GET', { firstName, lastName }, 'application/json', false);
}

export async function getAlbumsByFormat(format) { //Obtiene los álbumes por su formato
    return await apiRequest(`${BASE_URL}/get/by-format`, 'GET', format, 'application/json', false);
}

export async function getAlbumsByPriceRange(minPrice, maxPrice) { //Obtiene álbumes por rango de precio
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

export async function getFormats() { //Obtiene los formatos de álbumes
    return await apiRequest(`${BASE_URL}/get/formats`, 'GET', null, 'application/json', false);
}