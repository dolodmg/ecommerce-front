'use server';
import { getAllBooks, getBook, getBooksByAuthor, getBooksByEditorial, getBooksByPriceRange, createBook, updateBook, deleteBook, getGenres } from '@/lib/api/products/apiBooks';

export async function getAllBooksAction() {
    const { data } = await getAllBooks();
    return data;
}

export async function getBookAction(idProduct) {
    const { data } = await getBook(idProduct);
    return data;
}

export async function getBooksByAuthorAction(firstName, lastName) {
    const { data } = await getBooksByAuthor(firstName, lastName);
    return data;
}

export async function getBooksByEditorialAction(editorial) {
    const { data } = await getBooksByEditorial(editorial);
    return data;
}

export async function getBooksByPriceRangeAction(minPrice, maxPrice) {
    const { data } = await getBooksByPriceRange(minPrice, maxPrice);
    return data;
}

export async function createBookAction(bookData) {
    const { data } = await createBook(bookData);
    return data;
}

export async function updateBookAction(idProduct, bookData) {
    const { data } = await updateBook(idProduct, bookData);
    return data;
}

export async function deleteBookAction(idProduct) {
    const { data } = await deleteBook(idProduct);
    return data;
}

export async function getGenresAction() {
    const { data } = await getGenres();
    return data;
}