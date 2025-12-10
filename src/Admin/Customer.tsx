import React, { useState } from "react";
import PagesCard from "./PagesCard";
import TableHead, { ProductHeading, TableBody } from "./TableCard";
import { useLoaderData } from "react-router-dom";
import { CustomerList } from "./TableCard";
import { fetchAllCustomers } from "../Api/ProductApi";

export default function Customer() {
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const customers = useLoaderData() as any;
  console.log(customers);
  function handleClick(id: string) {
    setIsOpen((p) => (p === id ? null : id));
  }
  return (
    <PagesCard text="Customers">
      <table className="min-w-full items-center justify-center divide-y divide-gray-200">
        <TableHead>
          <ProductHeading text="Name" />
          <ProductHeading text="Email" />
          <ProductHeading text="Shipping Address" />
          <ProductHeading text="Action" />
        </TableHead>
        <TableBody>
          {customers.map((customer: any, index:number) => (
            <CustomerList
              key={index}
              name={customer.fullname}
              email={customer.email}
              address={customer.address}
              isOpen={isOpen === `${customer.id}-${index}`}
              handleClick={() => handleClick(`${customer.id}-${index}`)}
            />
          ))}
        </TableBody>
      </table>
    </PagesCard>
  );
}

export async function customerLoader() {
  const customers = await fetchAllCustomers();
  return customers;
}
