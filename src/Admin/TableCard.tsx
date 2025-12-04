import { useState } from "react";
import { TbArrowsUpDown } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseCl";
export default function TableHead({
  children,
  padding = 1,
  position = "justify-center",
}: {
  children: any;
  padding?: number;
  position?: string;
}) {
  const location = useLocation();
  const path = location.pathname === "/admin/dashboard";
  return (
    <>
      <thead className="inset-1.5 border-y border-gray-200 bg-white">
        <tr>
          <th
            className={`flex ${position} px-${padding} py-3 font-['Inter'] text-sm font-medium uppercase text-gray-600`}
          >
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
  isOpen,
  handleAction,
}: {
  img: string;
  name: string;
  sku: string;
  price: string;
  stock: boolean;
  categories?: string;
  date?: string;
  total?: string;
  isOpen: any;
  handleAction: () => void;
}) {
  const navigate = useNavigate();
  async function handleDeleteProduct(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("ProductList").delete().eq("id", id);

    if (error) {
      alert("Failed to delete");
    } else {
      alert("Product deleted");
      window.location.reload();
    }
  }

  return (
    <>
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
        <td className="relative whitespace-nowrap px-6 py-4">
          <button
            onClick={handleAction}
            className="font-['Inter'] text-sm font-medium text-gray-700 hover:cursor-pointer"
          >
            ...
          </button>
          {isOpen && (
            <ul className="absolute right-0 top-2 mt-2 w-32 rounded border bg-white shadow-lg">
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate(`/admin/edit-product/${sku}`)}
              >
                Edit product
              </li>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleDeleteProduct(sku)}
              >
                Delete product
              </li>
            </ul>
          )}
        </td>
      </tr>
    </>
  );
}

export function OrdersList({
  img,
  order,
  date,
  total,
  isOpen,
  handleAction,
}: {
  img?: string;
  order: string;
  date: string;
  total: string;
  isOpen?: any;
  handleAction?: () => void;
}) {
  const [progress, setprogress] = useState<string>("Processing");
  const location = useLocation();
  const path = location.pathname === "/admin/dashboard";
  return (
    <tr>
      <td
        className={`flex justify-center whitespace-nowrap px-1 py-4 ${path ? "hidden" : "block"}`}
      >
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
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{progress}</p>
      </td>
      <td className={`whitespace-nowrap px-6 py-4 ${path ? "hidden" : "block"} relative`}>
        <button
          onClick={handleAction}
          className="font-['Inter'] text-sm font-medium text-gray-700 hover:cursor-pointer"
        >
          ...
        </button>
        {isOpen && (
          <ul className="absolute right-0 top-2 mt-2 w-32 rounded border bg-white shadow-lg">
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setprogress("Approved");
              }}
            >
              Approved
            </li>
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setprogress("Cancelled");
              }}
            >
              Cancelled
            </li>
          </ul>
        )}
      </td>
    </tr>
  );
}

export function ReviewList({ name, review }: { name: string; review: string }) {
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
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{"..."}</p>
      </td>
    </tr>
  );
}
export function CustomerList({
  name,
  email,
  address,
}: {
  name: string;
  email: string;
  address: string;
}) {
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const second = parts[1]?.[0] || "";

  const initials = first + second;

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
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{email}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{address}</p>
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <p className="font-['Inter'] text-sm font-medium text-gray-700">{"..."}</p>
      </td>
    </tr>
  );
}
