import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";

export default function PagesCard({ children, text, searchTerm, setSearchTerm }: any) {
  const location = useLocation();
  const isTrue =
    location.pathname === "/admin/orders" ||
    location.pathname === "/admin/customers" ||
    location.pathname === "/admin/reviews" ||
    location.pathname === "/admin/setting" ||
    location.pathname === "/admin/add-products";
  return (
    <div className="lg:px-15 h-[900px] w-full max-w-full overflow-hidden rounded-lg bg-white px-5 outline outline-gray-200">
      <div className="flex flex-col justify-between gap-3 py-8 sm:flex sm:flex-row sm:gap-1 lg:py-10">
        <div>
          <p className="justify-start font-['Inter'] text-lg font-medium text-gray-900">{text}</p>
        </div>

        <div className="flex flex-col gap-4 lg:flex lg:flex-row">
          <NavLink
            to="/admin/add-products"
            className={`flex min-w-[130px] max-w-[130px] items-center rounded bg-gray-900 p-3 px-5 ${isTrue ? "hidden" : "block"}`}
          >
            <p className="font-['Inter'] text-sm font-medium text-white">Add product</p>
          </NavLink>

          <div className="relative w-full max-w-xs lg:max-w-64">
            <input
              type="text"
              placeholder={
                location.pathname === "/admin/customers"
                  ? "Search Customer"
                  : location.pathname === "/admin/orders"
                    ? "Search Orders"
                    : "Search Products"
              }
              className="rounded-md px-10 py-2.5 font-['Inter'] text-sm font-medium text-gray-500 outline outline-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-600" />
          </div>
        </div>
      </div>
      <div className="lg:px-15 h-[750px] w-full max-w-full overflow-hidden overflow-x-auto overflow-y-auto px-5">
        {children}
      </div>
    </div>
  );
}
