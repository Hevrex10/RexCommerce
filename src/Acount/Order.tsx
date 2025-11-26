import { useLoaderData } from "react-router-dom";
import ListCard from "../component/ListCard";
import { fetchOrderList } from "../Api/ProductApi";

function Order() {
  const orderList = useLoaderData() as any;
  const allitems = orderList.flatMap((order: any) => order.orderitems);

  return (
    <>
      <p className=" text-gray-900 text-base font-semibold font-['Inter']">Orders</p>
      {allitems.map((item: any) => (
        <ListCard
          key={item.id}
          image={item.image}
          name={item.name}
          date={item.date} 
          priceOrtext={item.price}
          stateOrprice="Processing"
          text="View item"
        />
      ))}
    </>
  );
}
export default Order;

export async function orderLoader() {
  const orders = await fetchOrderList();
  return orders;
}


