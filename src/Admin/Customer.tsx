import React from "react";
import PagesCard from "./PagesCard";
import TableHead, { ProductHeading, TableBody } from "./TableCard";
import { useLoaderData } from "react-router-dom";
import { CustomerList } from "./TableCard";
import { fetchAllCustomers } from "../Api/ProductApi";

export default function Customer() {
   const customers = useLoaderData() as any
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
          {customers.map((customer:any)=> <CustomerList key={customer.id} name={customer.fullname} email={customer.email} address={customer.address}/>)}
        </TableBody>
      </table>
    </PagesCard>
  );
}

export async function customerLoader(){
  const customers = await fetchAllCustomers()
  return customers
}

