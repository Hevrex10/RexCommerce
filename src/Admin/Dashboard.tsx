import TableHead, { OrdersList, ProductHeading } from "./TableCard";
import { DashboardCard, BestSelling } from "./Card";
import { fetchAllCustomers, fetchAllOrders } from "../Api/ProductApi";
import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const [ordersData, customerData] = useLoaderData() as any;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const orders = ordersData.flatMap((order: any) =>
    order.orderitems.filter((item: any) => {
      const orderDate = new Date(item.date);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    })
  );

  const customers = new Set(
    customerData
      .filter((c: any) => {
        const customerOrders = ordersData.find((o: any) => o.user_Id === c.user_Id);
        if (!customerOrders) return false;
        return customerOrders.orderitems.some((item: any) => {
          const orderDate = new Date(item.date);
          return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
        });
      })
      .map((c: any) => c.user_Id)
  ).size;

  const orderTarget = 100;
  const orderLength = orders.length;
  const orderPercentage = Math.min((orderLength / orderTarget) * 100, 100);
  const ordersLeft = Math.max(orderTarget - orderLength, 0);

  const totalSale = orders.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
  const productMap: Record<string, { count: number; totalAmount: number; price: number }> = {};

  orders.forEach((item: any) => {
    const name = item.name;
    const singlePrice = item.price;
    const totalPriceForThatOrder = item.totalPrice;

    if (productMap[name]) {
      productMap[name].count += 1;
      productMap[name].totalAmount += totalPriceForThatOrder;
    } else {
      productMap[name] = {
        count: 1,
        totalAmount: totalPriceForThatOrder,
        price: singlePrice,
      };
    }
  });

  const top3Products = Object.entries(productMap)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 3)
    .map(([name, data]) => ({
      name,
      count: data.count,
      price: data.price,
      totalAmount: data.totalAmount,
    }));

  const totalPrice = top3Products.reduce((sum, product) => sum + product.totalAmount, 0);

  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-6 pt-10 md:grid-cols-3">
        <DashboardCard text="Total sale" price={totalSale} currency="$">
          <img src="/images/Barchart.png" alt="Bar chart" width={"420px"} />
        </DashboardCard>

        <DashboardCard text="Customers" price={customers}>
          <img src="/images/Chart.png" alt="Bar chart" width={"420px"} />
        </DashboardCard>

        <DashboardCard text="Orders" price={orderLength} period={`MONTHLY GOALS: ${orderTarget}`}>
          <div className="w-full">
            <p className="text-sm font-medium">{ordersLeft} Left</p>

            <div className="mt-1 h-2 w-full rounded-full bg-blue-100">
              <div
                className="h-2 w-[60%] rounded-full bg-blue-500"
                style={{ width: `${orderPercentage}%` }}
              ></div>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 gap-8 md:auto-rows-fr md:grid-cols-3">
        <div className="md:col-span-1">
          <BestSelling top3Products={top3Products} totalPrice={totalPrice} />
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
              />
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export async function allOrderLoader() {
  const ordersData = await fetchAllOrders();
  const customerData = await fetchAllCustomers();
  return [ordersData, customerData];
}
