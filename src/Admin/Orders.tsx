import { useLoaderData } from "react-router-dom";
import { fetchAllOrders } from "../Api/ProductApi";
import PagesCard from "./PagesCard";
import TableHead, { List, OrdersList, ProductHeading, TableBody } from "./TableCard";
import { useState } from "react";

export default function Orders() {
  const [searchOrder, setSearchOrder] = useState<string>("");
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  

  const orders = useLoaderData() as any;
  const allOrder = orders.flatMap((order: any) => order.orderitems);

  const filteredOrder = allOrder.filter((product: any) =>
    product.name.toLowerCase().includes(searchOrder.toLowerCase())
  );
  const filteredOrders = filteredOrder ?? [];

  function handleAction(id: string) {
    setOpenActionId((prev) => (prev === id ? null : id));
  }

  return (
    <PagesCard text="Orders" searchOrder={searchOrder} setSearchOrder={setSearchOrder}>
      <table className="min-w-full items-center justify-center divide-y divide-gray-200">
        <TableHead>
          <ProductHeading text="Order" />
          <ProductHeading text="Date" />
          <ProductHeading text="Total" />
          <ProductHeading text="Status" />
          <ProductHeading text="Action" />
        </TableHead>{" "}
        <TableBody>
          {filteredOrders.map((order: any, index: number) => (
            <OrdersList
              key={index}
              img={order.image}
              order={order.name}
              date={order.date}
              total={order.totalPrice}
              isOpen={openActionId === `${order.id}-${index}`}
              handleAction={() => handleAction(`${order.id}-${index}`)}
            />
          ))}
        </TableBody>
      </table>
    </PagesCard>
  );
}

export async function adminOrderList() {
  const orders = await fetchAllOrders();
  return orders;
}
