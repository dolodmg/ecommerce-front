'use server';
import { getAll, getBoardGame, getBoardGamesByBrand, getBoardGamesByPriceRange, createBoardGame, updateBoardGame, deleteBoardGame } from '@/lib/api/products/apiBoardgames';

export async function getAllAction() {
    const { data } = await getAll();
    return data;
}

export async function getBoardGameAction(idProduct) {
    const { data } = await getBoardGame(idProduct);
    return data;
}

export async function getBoardGamesByBrandAction(brand) {
    const { data } = await getBoardGamesByBrand(brand);
    return data;
}

export async function getBoardGamesByPriceRangeAction(minPrice, maxPrice) {
    const { data } = await getBoardGamesByPriceRange(minPrice, maxPrice);
    return data;
}

export async function createBoardGameAction(boardgameData) {
    const { data } = await createBoardGame(boardgameData);
    return data;
}

export async function updateBoardGameAction(idProduct, boardgameData) {
    const { data } = await updateBoardGame(idProduct, boardgameData);
    return data;
}

export async function deleteBoardGameAction(idProduct) {
    const { data } = await deleteBoardGame(idProduct);
    return data;
}