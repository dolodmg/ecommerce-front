'use client'
import React, { useState, useEffect } from "react";
import { getAllAction } from "@/server/boardgames";
import ProductCard from "@/components/products/ui/productCard";
import { Inter } from "next/font/google";

const inter = Inter(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function BoardgamePage() {
    const [boardgames, setBoardgames] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchBoardgames = async () => {
            try {
                const boardgames = await getAllAction();
                setBoardgames(boardgames);
            } catch (err) {
                setError("Error al obtener los juegos de mesa");
            } finally {
                setLoading(false);
            }
        };
        fetchBoardgames();
    }, []);


    if (loading) return <p>Cargando juegos de mesa</p>;
    if (error) return <p>{error}</p>;
    return (
       <div className="flex flex-col">
            <h1 className={`${inter.className} text-2xl font-bold text-center my-4`}>Juegos de mesa</h1>
        
            <div className="flex flex-wrap justify-center gap-4">
                {boardgames.length > 0 ? (
                    boardgames.map(boardgame => (
                    <ProductCard key={boardgame.idProduct} idProduct={boardgame.idProduct}/>
                ))
                ) : (
                    <p className={`${inter.className} text-md font-light text-zinc-600 mt-2`}>No se encontraron juegos de mesa</p>
                )}
            </div>
       </div>
    )
}