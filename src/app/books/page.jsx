'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFilteredAction } from '@/server/products';
import ProductCard from '@/components/products/ui/productCard';
import BookFilters from '@/components/filters/ui/books/BookFilters';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '900'],
});

const BooksPage = () => {
    const searchParams = useSearchParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const genre = searchParams.get('genre') || '';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const books = await getFilteredAction('BOOKS', minPrice, maxPrice, genre, null);
        setBooks(books);
      } catch (err) {
        setError('Error al obtener los libros');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [genre, minPrice, maxPrice]);

  return (
    <div className='flex flex-row'>
      <div className="w-1/5">
        <BookFilters />
      </div>
      <div className={`${inter.className} w-4/5 flex flex-wrap items-start justify-center gap-4 mt-4`}>
        {loading ? (
          <p className="text-zinc-500">Cargando libros...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : books.length > 0 ? (
          books.map((book) => (
            <ProductCard key={book.idProduct} idProduct={book.idProduct} />
          ))
        ) : (
          <p className="text-zinc-500">No se encontraron libros con esos filtros.</p>
        )}
      </div>
    </div>
  );
}

export default BooksPage;