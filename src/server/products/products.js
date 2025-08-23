'use server';
import { getProducts, getProductById, updateStock, getFiltered, searchProducts } from '@/lib/api/products/apiProducts';

export async function getProductsAction() {
    const { data } = await getProducts();
    return data;
}

export async function getProductByIdAction(idProduct) {
    const { data } = await getProductById(idProduct);
    return data;
}

export async function updateStockAction(idProduct, quantity) {
    const { data } = await updateStock(idProduct, quantity);
    return data;
}

export async function getFilteredAction(category, minPrice, maxPrice, genre, albumFormat, albumGenre) {
    const { data } = await getFiltered(category, minPrice, maxPrice, genre, albumFormat, albumGenre);
    return data;
}

export async function searchProductsAction(keyword) {
    const { data } = await searchProducts(keyword);
    return data;
}