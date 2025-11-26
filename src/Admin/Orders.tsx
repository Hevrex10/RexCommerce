import { useLoaderData } from "react-router-dom";
import { fetchAllOrders } from "../Api/ProductApi";
import PagesCard from "./PagesCard";
import TableHead, { List, OrdersList, ProductHeading, TableBody } from "./TableCard";
import { useState } from "react";

export default function Orders() {
  const [searchOrder, setSearchOrder] = useState<string>("");
   const orders = useLoaderData() as any
   const allOrder = orders.flatMap((order:any) => order.orderitems);
   
     const products = useLoaderData() as any;
     const filteredOrder = allOrder.filter((product: any) =>
       product.name.toLowerCase().includes(searchOrder.toLowerCase())
     );

  return (
        <PagesCard text="Orders" searchOrder={searchOrder} setSearchOrder={setSearchOrder} >
             <table className="min-w-full items-center justify-center divide-y divide-gray-200">
                    <TableHead>
                      <ProductHeading text="Order" />
                      <ProductHeading text="Date" />
                      <ProductHeading text="Total" />
                      <ProductHeading text="Status" />
                      <ProductHeading text="Action" />
                    </TableHead>
                   <TableBody>
                    {filteredOrder.map((order:any)=> <OrdersList key={order.id} img={order.image} order={order.name} date={order.date} total={order.totalPrice} status={"Processing"}/>)}
                   </TableBody>
                  </table>
        </PagesCard>
   
  )
}
 
export async function adminOrderList(){
   const orders = await fetchAllOrders() 
   return orders
}
