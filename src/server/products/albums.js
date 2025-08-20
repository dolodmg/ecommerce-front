'use server';

import { getAll, getAlbum, getAlbumsByArtist, getAlbumsByFormat, getAlbumsByPriceRange, createAlbum, editAlbum, deleteAlbum, getFormats, getAlbumGenres, getPopAlbumsByDateDesc } from '@/lib/api/products/apiAlbums';

export async function getAllAction() {
    const { data } = await getAll();
    return data;
}

export async function getAlbumAction(idProduct) {
    const { data } = await getAlbum(idProduct);
    return data;
}

export async function getAlbumsByArtistAction(firstName, lastName) {
    const { data } = await getAlbumsByArtist(firstName, lastName);
    return data;
}

export async function getAlbumsByFormatAction(format) {
    const { data } = await getAlbumsByFormat(format);
    return data;
}

export async function getAlbumsByPriceRangeAction(minPrice, maxPrice) {
    const { data } = await getAlbumsByPriceRange(minPrice, maxPrice);
    return data;
}

export async function createAlbumAction(albumData) {
    const { data } = await createAlbum(albumData);
    return data;
}

export async function editAlbumAction(idProduct, albumData) {
    const { data } = await editAlbum(idProduct, albumData);
    return data;
}

export async function deleteAlbumAction(idProduct) {
    const { data } = await deleteAlbum(idProduct);
    return data;
}

export async function getFormatsAction() {
    const { data } = await getFormats();
    return data;
}

export async function getAlbumGenresAction() {
    const { data } = await getAlbumGenres();
    return data;
}

export async function getPopAlbumsByDateDescAction() {
    const { data } = await getPopAlbumsByDateDesc();
    return data;
}