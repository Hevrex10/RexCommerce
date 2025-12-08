import React, { useState } from "react";
import PagesCard from "./PagesCard";
import TableHead, { ProductHeading, TableBody, ReviewList } from "./TableCard";
import { fetchProducts } from "../Api/ProductApi";
import { useLoaderData } from "react-router-dom";

export default function Review() {
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  function handleAction(id: string) {
    setOpenActionId((prev) => (prev === id ? null : id));
  }

  const details = useLoaderData() as any;

  return (
    <PagesCard text="Customers">
      <table className="min-w-full items-center justify-center divide-y divide-gray-200">
        <TableHead>
          <ProductHeading text="Name" />
          <ProductHeading text="Review" />
          <ProductHeading text="Action" />
        </TableHead>
        <TableBody>
          {details.map((product: any) =>
            (product.reviews || []).map((review: any) => (
              <ReviewList
                key={review.id}
                name={review.user ?? ""}
                review={review.comment ?? ""}
                id={review.id}
                productId={product.id} 
                isOpen={openActionId === review.id}
                handleAction={() => handleAction(review.id)}
              />
            ))
          )}
        </TableBody>
      </table>
    </PagesCard>
  );
}

export async function ReviewLoader() {
  const reviews = await fetchProducts();
  return reviews;
}
