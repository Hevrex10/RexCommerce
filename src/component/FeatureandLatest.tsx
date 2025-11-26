import React, { useState } from "react";
import { fetchProducts } from "../Api/ProductApi";
import { useLoaderData } from "react-router-dom";
import { Product } from "../Type/Type";
import ProductsCard from "./ProductsCard";

export default function FeatureandLatest() {
  const { products } = useLoaderData() as { products: Product[] };

  const [select, setSelect] = useState<"featured" | "latest">("featured");

  const featured = products.filter((p) => p.colors.includes("bg-black")).slice(0, 4);
  const latest = products
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4);
  const displayedProducts = select === "featured" ? featured : latest;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1116px] mx-auto my-20 sm:my-25 md:my-29 lg:my-32 text-center">
        {/* Buttons */}
        <div className="inline-flex justify-center sm:justify-start items-center gap-3 mb-10 flex-wrap">
          <button
            onClick={() => setSelect("featured")}
            className={`px-4 py-1 rounded-full text-sm font-medium font-['Inter'] leading-6 hover:cursor-pointer ${
              select === "featured"
                ? "outline outline-gray-200 bg-gray-900 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Featured
          </button>

          <button
            onClick={() => setSelect("latest")}
            className={`px-4 py-1 rounded-full text-sm font-medium font-['Inter'] leading-6 hover:cursor-pointer ${
              select === "latest"
                ? "outline outline-gray-200 bg-gray-900 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Latest
          </button>
        </div>

        {/* Products Grid */}
        <div className="flex max-w-[1092px] justify-items-center overflow-x-scroll scrollbar-hide ">
          {displayedProducts.map((p) => (
            <ProductsCard
              id={p.id}
              stock={p.instock ? "IN STOCK" : "OUT OF STOCK"}
              key={p.id}
              productName={p.name}
              src={p.image}
              price={p.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
