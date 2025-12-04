import React from "react";
import ProductsCard from "./ProductsCard";
import { fetchProducts } from "../Api/ProductApi";
import { useLoaderData } from "react-router-dom";
import { Product } from "../Type/Type";

export default function BestSelling() {
  const { products } = useLoaderData() as { products: Product[] };

  const productsWithAvgRating = products.map((product) => {
    const reviews = Array.isArray(product.reviews) ? product.reviews : [];
    const ratings = reviews.map((r) => r.rating);

    const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

    return { ...product, avgRating };
  });
  const sortedProducts = productsWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);

  const bestSelling = sortedProducts.slice(0, 6);
  return (
    <section className="max-w-full px-4 sm:px-6 lg:px-8">
      <div className="sm:my-15 md:my-23 lg:my-30 mx-auto my-10 flex max-w-[1092px] flex-col gap-10 lg:gap-20">
        <div className="flex flex-col gap-4">
          <p className="text-center font-['Inter'] text-xs font-medium uppercase leading-6 tracking-wide text-gray-500">
            Shop Now
          </p>
          <p className="text-center font-['Inter'] text-2xl font-bold text-gray-900">
            Best Selling
          </p>
        </div>
        <div className="scrollbar-hide flex max-w-[1092px] items-center justify-between overflow-x-scroll">
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
