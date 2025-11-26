import React from "react";
import ProductsCard from "./ProductsCard";
import { fetchProducts } from "../Api/ProductApi";
import { useLoaderData } from "react-router-dom";
import { Product } from "../Type/Type";

export default function BestSelling() {
  const { products } = useLoaderData() as { products: Product[] };

  const productsWithAvgRating = products.map((product) => {
    const ratings = product.reviews.map((r) => r.rating);
    const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return { ...product, avgRating };
  });
  const sortedProducts = productsWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);

  const bestSelling = sortedProducts.slice(0, 6);
  return (
    <section className="max-w-full px-4 sm:px-6 lg:px-8">
      <div className=" flex flex-col max-w-[1092px] mx-auto my-10 sm:my-15 md:my-23 lg:my-30 gap-10  lg:gap-20">
        <div className="flex flex-col gap-4">
          <p className=" text-gray-500 text-xs font-medium font-['Inter'] uppercase leading-6 tracking-wide text-center">
            Shop Now
          </p>
          <p className=" text-gray-900 text-2xl font-bold font-['Inter'] text-center">
            Best Selling
          </p>
        </div>
        <div className="max-w-[1092px] flex justify-between items-center overflow-x-scroll scrollbar-hide">
          {bestSelling.map((p) => (
            <ProductsCard
              id={Number(p.id)}
              stock={p.instock ? "IN STOCK" : "Out of Stock"}
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

export async function productLoader() {
  const products = await fetchProducts();
  return { products };
}
