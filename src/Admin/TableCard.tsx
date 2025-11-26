import { TbArrowsUpDown } from "react-icons/tb";
import { useLocation } from "react-router-dom";
export default function TableHead({ children,padding=1, position="justify-center" }: { children: any,padding?:number, position?:string }) {

    const location = useLocation()
    const path = location.pathname === "/admin/dashboard"
  return (
    <>
      <thead className="inset-1.5 border-y border-gray-200 bg-white">
        <tr>
          <th className={`flex ${position} px-${padding} py-3 font-['Inter'] text-sm font-medium uppercase text-gray-600`}>
            {path ? "Items" : <TbArrowsUpDown />}
          </th>

          {children}
        </tr>
      </thead>
    </>
  );
}

export function ProductHeading({ text }: { text: string }) {
  return (
    <th className="px-6 py-3 text-left font-['Inter'] text-sm font-medium uppercase text-gray-600">
      {text}
    </th>
  );
}

export function TableBody({ children }: any) {
  return <tbody className="divide-y divide-gray-100 bg-white">{children}</tbody>;
}

export function List({
  img,
  name,
  sku,
  price,
  stock,
  categories,
  date,
}: {
  img: string;
  name: string;
  sku: string;
  price: string;
  stock: boolean;
  categories?: string;
  date?: string;
  total?: string;
}) {
  return (
    <tr>
      <td className="flex justify-center whitespace-nowrap px-1 py-4">
        <img src={img} alt={""} className="h-12 w-12 object-cover" />
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{name}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{sku}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{price}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p
          className={`text-sm font-medium ${stock ? "text-gray-700" : "text-red-600"} font-['Inter']`}
        >
          {stock ? "INSTOCK" : "OUT OF STOCK"}
        </p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{categories}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{"----"}</p>
      </td>
    </tr>
  );
}

export function OrdersList({
  img,
  order,
  date,
  total,
  status,
}: {
  img?: string;
  order: string;
  date: string;
  total: string;
  status?: string;
}) {
   const location = useLocation()
    const path = location.pathname === "/admin/dashboard"
  return (
    <tr>
      <td className={`flex justify-center whitespace-nowrap px-1 py-4 ${path ? "hidden" : "block"}`}>
        <img src={img} alt={""} className="h-12 w-12 object-cover" />
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{order}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{date}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{total}</p>
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{status}</p>
      </td>
       <td className={`whitespace-nowrap px-6 py-4 ${path ? "hidden" : "block"}`}>
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{"----"}</p>
      </td>
    </tr>
  );
}

export function ReviewList({ img, name, review }: { img: string; name: string; review: string }) {
  const parts = name.split(" ");
  const initials = parts[0][0] + "" + parts[1][0];

  return (
    <tr>
      <td className="flex justify-center whitespace-nowrap px-1 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-200">
          <p className="text-blue-500">{initials}</p>
        </div>
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{name}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{review}</p>
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{"----"}</p>
      </td>
    </tr>
  );
}


