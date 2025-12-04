import { useLoaderData } from "react-router-dom";
import { fetchProducts } from "../Api/ProductApi";
import PagesCard from "./PagesCard";
import TableHead, { List, ProductHeading, TableBody } from "./TableCard";
import { useState } from "react";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  const products = useLoaderData() as any;
  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleAction(id: number) {
    setOpenActionId((prev) => (prev === id ? null : id));
  }

  return (
    <PagesCard text="Products" setSearchTerm={setSearchTerm} searchTerm={searchTerm}>
      <table className="min-w-full items-center justify-center divide-y divide-gray-200">
        <TableHead>
          <ProductHeading text="Name" />
          <ProductHeading text="SKU" />
          <ProductHeading text="Price" />
          <ProductHeading text="Stock" />
          <ProductHeading text="Categories" />
          <ProductHeading text="Action" />
        </TableHead>
        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p: any) => (
              <List
                key={p.id}
                img={p.image}
                name={p.name}
                sku={p.id}
                price={p.price}
                stock={p.instock}
                categories={p.category}
                isOpen={openActionId === p.id}
                handleAction={() => handleAction(p.id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </TableBody>
      </table>
    </PagesCard>
  );
}

export async function AdminproductLoader() {
  const products = await fetchProducts();
  return products;
}
