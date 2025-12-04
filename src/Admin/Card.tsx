import { BsDashLg } from "react-icons/bs";

export function DashboardCard({
  text,
  price,
  children,
  currency,
  period = "THIS MONTH"
}: {
  text: string;
  price?: number;
  children: any;
  currency?:string;
  period?:string
}) {
  return (
    <div className="gap-15 flex flex-col rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-['Inter'] text-base font-semibold text-zinc-900">{text}</p>
          <p className="justify-start font-['Inter'] text-xs font-medium uppercase leading-6 tracking-wide text-gray-600">
           {period}
          </p>
        </div>
        <div>
          <div className="justify-start font-['Inter'] text-2xl font-bold text-zinc-900">
            {currency}{price}
          </div>
        </div>
      </div>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}

export function BestSelling({top3Products,totalPrice}:any) {

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-gray-200 p-5">
        <div className="flex flex-col gap-2">
          <p className="font-['Inter'] text-base font-semibold text-zinc-900">Best Selling</p>
          <p className="justify-start font-['Inter'] text-xs font-medium uppercase leading-6 tracking-wide text-gray-600">
            THIS MONTH
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-7 px-5 pb-7">
        <div className="flex">
          <div className="flex items-center justify-start gap-3">
            <p className="justify-start font-['Inter'] text-2xl font-bold text-zinc-900">${totalPrice}</p>

            <p className="justify-start font-['Inter'] text-xl font-medium leading-6 text-gray-600">
              ---- Total Sales
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {top3Products.map((product:any)=> <TotalSale key={product.name} product={product.name} price={product.totalAmount} /> )}
          
        </div>
        <div className="h-24 w-24">
          <img src="/images/Doughnut Chart.png" alt="Bar chart" />
        </div>
      </div>
    </div>
  );
}

function TotalSale({ price, product }: { price: string; product: string }) {
  return (
    <div className="flex items-center justify-start gap-1 rounded-[100px] px-4 py-0.5 outline outline-gray-200">
      <span className="font-['Inter'] text-xs font-medium capitalize leading-6 text-gray-600">
        {product}
      </span>
      <BsDashLg />
      <span className="font-['Inter'] text-xs font-medium capitalize leading-6 text-gray-900">
        ${price} sales
      </span>
    </div>
  );
}

export function Color({
  bg,
  onClick,
  selected,
}: {
  bg: string;
  onClick: () => void;
  selected: any;
}) {
  return (
    <>
      <div
        onClick={onClick}
        className={`flex h-8 w-8 items-center justify-center gap-2 rounded-[100px] hover:cursor-pointer`}
      >
        <div
          className={`h-6 w-6 ${bg} rounded-[100px] outline outline-gray-300 ${selected ? "outline-2 outline-gray-600" : "outline-2 outline-gray-300"}`}
        />
      </div>
    </>
  );
}

export function Sizes({
  size,
  onClick,
  selected,
}: {
  size: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex h-10 min-w-10 flex-col items-center justify-center overflow-hidden rounded outline hover:cursor-pointer ${selected ? "outline-gray-900" : "outline-gray-400"}`}
    >
      <p className="justify-start text-center font-['Inter'] text-xs font-medium capitalize leading-6 text-zinc-600">
        {size}
      </p>
    </div>
  );
}
