'use client'
import React, { useState, useEffect } from "react";
import { getFilteredAction } from "@/server/products/products";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ui/productCard";
import { Inter } from "next/font/google";
import { FiFilter } from "react-icons/fi";
import BoardgameFilters from "@/components/filters/boardgames/boardgameFilters";

const inter = Inter(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function BoardgamePage() {
    const [boardgames, setBoardgames] = useState(null);
    const searchParams = useSearchParams();
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchBoardgames = async () => {
            try {
                const boardgames = await getFilteredAction('BOARDGAMES', minPrice, maxPrice, null, null, null);
                setBoardgames(boardgames);
            } catch (err) {
                setError("Error al obtener los juegos de mesa");
            } finally {
                setLoading(false);
            }
        };
        fetchBoardgames();
    }, [minPrice, maxPrice]);

    const [showFilters, setShowFilters] = useState(false);

    if (loading) return <p>Cargando juegos de mesa</p>;
    if (error) return <p>{error}</p>;
    return (
       <main className="bg-zinc-50 min-h-screen">
                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                       <h1 className="text-3xl font-bold mb-6 text-zinc-800 tracking-tight">Juegos de mesa</h1>
                       <div className="flex gap-8">
                           {/* Panel de Filtros */}
                           <aside className="hidden lg:block w-72">
                               <div className="sticky top-24 bg-white rounded-xl shadow p-6 border border-zinc-100">
                                   <BoardgameFilters />
                               </div>
                           </aside>
       
                           {/* Drawer de filtros en mobile */}
                           <div className="lg:hidden mb-4">
                               <button
                                   className="flex items-center gap-2 px-4 py-2 bg-zinc-200 rounded-lg font-medium text-zinc-700 hover:bg-zinc-300 transition"
                                   onClick={() => setShowFilters(true)}
                               >
                                   <FiFilter /> Filtros
                               </button>
                               {showFilters && (
                                   <div className="fixed inset-0 z-40 bg-black/40 flex">
                                       <div className="bg-white w-80 max-w-full h-full p-6 shadow-lg">
                                           <div className="flex justify-between items-center mb-4">
                                               <h2 className="text-xl font-semibold flex items-center gap-2">
                                                   <FiFilter className="text-zinc-500" /> Filtros
                                               </h2>
                                               <button onClick={() => setShowFilters(false)} className="text-zinc-500 hover:text-zinc-800 text-2xl">&times;</button>
                                           </div>
                                           <BoardgameFilters />
                                       </div>
                                       <div className="flex-1" onClick={() => setShowFilters(false)} />
                                   </div>
                               )}
                           </div>
       
                           {/* Grilla de productos */}
                           <section className="flex-1">
                               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                   {loading ? (
                                       <p className="col-span-full text-zinc-500">Cargando juegos de mesa...</p>
                                   ) : error ? (
                                       <p className="col-span-full text-red-500">{error}</p>
                                   ) : boardgames && boardgames.length > 0 ? (
                                       boardgames.map((boardgame) => (
                                           <ProductCard key={boardgame.idProduct} idProduct={boardgame.idProduct} />
                                       ))
                                   ) : (
                                       <p className="col-span-full text-zinc-500">No se encontraron juegos de mesa con esos filtros.</p>
                                   )
                               }
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}