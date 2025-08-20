import React from "react";
import { PaymentOptions } from "@/components/home/paymentOptions";
import CategoriesBanner from "@/components/categories/categoriesBanner";
import { BestSellerSection } from "@/components/home/bestSellerSection";
import { PopAlbumsSection } from "@/components/home/popAlbumsSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      <div className="pt-8">
        <PaymentOptions />
      </div>
      <BestSellerSection limit={5} />
      <div className="pt-8">
          <CategoriesBanner />
        </div>
      <PopAlbumsSection limit={5} />
    </main>
  );
}
