import React from "react";
import CategoriesBanner from "@/components/categories/categoriesBanner";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <CategoriesBanner />
      <div className="mt-8">
        <Link href="/products" className="text-blue-500 hover:underline">
          Producto
        </Link>
      </div>
    </main>
  );
}
