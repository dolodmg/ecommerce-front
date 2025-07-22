import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8082/boardgames';

export async function getAll() { //Obtiene la lista de todos los juegos de mesa
    return await apiRequest(`${BASE_URL}/get/all`, 'GET', null, 'application/json', false);
}

export async function getBoardGame(idProduct) { //Obtiene un juego de mesa por su ID
    return await apiRequest(`${BASE_URL}/get/${idProduct}`, 'GET', null, 'application/json', false);
}

export async function getBoardGamesByBrand(brand) { //Obtiene juegos de mesa por marca
    return await apiRequest(`${BASE_URL}/get/by-brand`, 'GET', brand, 'application/json', false);
}

export async function getBoardGamesByPriceRange(minPrice, maxPrice) { //Obtiene juegos de mesa en un rango de precios
    return await apiRequest(`${BASE_URL}/get/by-price-range`, 'GET', { minPrice, maxPrice }, 'application/json', false);
}

export async function createBoardGame(boardgameData) { //Crea un nuevo juego de mesa
    return await apiRequest(`${BASE_URL}/post`, 'POST', boardgameData, 'application/json', false);
}

export async function editBoardGame(idProduct, boardgameData) { //Actualiza un juego de mesa existente
    return await apiRequest(`${BASE_URL}/edit/${idProduct}`, 'PUT', boardgameData, 'application/json', false);
}

export async function deleteBoardGame(idProduct) { //Elimina logicamente un juego de mesa por su ID
    return await apiRequest(`${BASE_URL}/delete/${idProduct}`, 'DELETE', null, 'application/json', false);
}