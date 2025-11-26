import React from "react";
import PagesCard from "./PagesCard";
import TableHead, { ProductHeading, TableBody } from "./TableCard";
import { useLoaderData } from "react-router-dom";

export default function Customer() {

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

        </TableBody>
      </table>
    </PagesCard>
  );
}

