import { BsDashLg } from "react-icons/bs";
import TableHead, { OrdersList, ProductHeading } from "./TableCard";
import { DashboardCard, BestSelling } from "./Card";
import { fetchAllOrders } from "../Api/ProductApi";
import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const loader = useLoaderData() as any;
  const orders = loader.flatMap((order: any) => order.orderitems);
   
   const totalSale = orders.reduce((sum:number, item:any) => sum + item.totalPrice, 0);
 
  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-6 pt-10 md:grid-cols-3">
        <DashboardCard text="Total sale" price={totalSale}>
          <img src="/images/Barchart.png" alt="Bar chart" width={"420px"} />
        </DashboardCard>

        <DashboardCard text="Customers" price="2571">
          <img src="/images/Chart.png" alt="Bar chart" width={"420px"} />
        </DashboardCard>

        <DashboardCard text="Orders" price="734">
          <div className="w-full">
            <p className="text-sm font-medium">266 Left</p>

            <div className="mt-1 h-2 w-full rounded-full bg-blue-100">
              <div className="h-2 rounded-full bg-blue-500 w-[60%]"></div>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 gap-8 md:auto-rows-fr md:grid-cols-3">
        <div className="md:col-span-1">
          <BestSelling />
        </div>

        <div className="h-[437px] overflow-hidden rounded-lg bg-white p-6 shadow-md md:col-span-2">
          <table className="min-w-full items-center justify-center divide-y divide-gray-200">
            <TableHead padding={5} position="justify-start">
              <ProductHeading text="Date" />
              <ProductHeading text="Total" />
              <ProductHeading text="Status" />
            </TableHead>
            {orders.map((order: any) => (
              <OrdersList
                key={order.id}
                order={order.name}
                date={order.date}
                total={order.totalPrice}
                status=""
              />
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export async function allOrderLoader() {
  const orders = await fetchAllOrders();
  return orders;
}
