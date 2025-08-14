import 'server-only'
import { apiRequest } from '../../apiRequest';

const BASE_URL = 'http://localhost:8082/books';

export async function getAllBooks() {
    return await apiRequest(`${BASE_URL}/get/all`, 'GET', null, 'application/json', false);
}

export async function getBook(idProduct) {
    return await apiRequest(`${BASE_URL}/get/${idProduct}`, 'GET', null, 'application/json', false);
}

export async function getBooksByAuthor(firstName, lastName) {
    return await apiRequest(`${BASE_URL}/get/by-author`, 'GET', { firstName, lastName }, 'application/json', false);
}

export async function getBooksByEditorial(editorial) {
    return await apiRequest(`${BASE_URL}/get/by-editorial`, 'GET', editorial, 'application/json', false);
}

export async function getBooksByPriceRange(minPrice, maxPrice) {
    return await apiRequest(`${BASE_URL}/get/by-price-range`, 'GET', { minPrice, maxPrice }, 'application/json', false);
}

export async function createBook(bookData) { //Crea un nuevo libro
    return await apiRequest(`${BASE_URL}/post`, 'POST', bookData, 'application/json', false);
}

export async function updateBook(idProduct, bookData) { //Actualiza un libro existente
    return await apiRequest(`${BASE_URL}/edit/${idProduct}`, 'PUT', bookData, 'application/json', false);
}

export async function deleteBook(idProduct) { //Elimina logicamente un libro por su ID
    return await apiRequest(`${BASE_URL}/delete/${idProduct}`, 'DELETE', null, 'application/json', false);
}

export async function getGenres() {
    return await apiRequest(`${BASE_URL}/get/genres`, 'GET', null, 'application/json', false);
}
