import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { supabase } from "../supabaseCl";
import AdminOption from "./AdminOption";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

export default function AdminPage() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function handleClick() {
    setIsVisible((p) => !p);
  }

  const location = useLocation();

  return (
    <main className="relative flex w-full">
      <section className="flex w-full">
        {/* SIDEBAR */}
        <div
          className={`min-w-65 max-w-68 absolute z-50 flex h-screen flex-col gap-10 border-r border-gray-200 bg-white lg:relative ${isVisible ? "flex" : "hidden"} lg:flex`}
        >
          <div className="flex h-20 items-center justify-center gap-2">
            <div className="flex items-center gap-3">
              <img src="/images/Logo.png" alt="Logo" />
              <p className="font-['Manrope'] text-xl font-extrabold capitalize leading-6 text-gray-900">
                Admin
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 px-4">
            <div onClick={handleClick} className="flex w-full justify-end px-6 py-2 lg:hidden">
              <RxCross1 className="text-2xl" />
            </div>

            <AdminOption
              logo="/images/Dashboard.svg"
              name="Dashboard"
              to="/admin/dashboard"
              bg={location.pathname === "/admin/dashboard"}
              onClick={() => setIsVisible(false)}
            />
            <AdminOption
              logo="/images/Product.svg"
              name="Products"
              to="/admin/products"
              bg={location.pathname === "/admin/products"}
              onClick={() => setIsVisible(false)}
            />
            <AdminOption
              logo="/images/Cart.svg"
              name="Orders"
              to="/admin/orders"
              bg={location.pathname === "/admin/orders"}
              onClick={() => setIsVisible(false)}
            />
            <AdminOption
              logo="/images/Users.svg"
              name="Customers"
              to="/admin/customers"
              bg={location.pathname === "/admin/customers"}
              onClick={() => setIsVisible(false)}
            />
            <AdminOption
              logo="/images/Empty Star.svg"
              name="Reviews"
              to="/admin/reviews"
              bg={location.pathname === "/admin/reviews"}
              onClick={() => setIsVisible(false)}
            />
            <AdminOption
              logo="/images/Settings.svg"
              name="Settings"
              to="/admin/settings"
              bg={location.pathname === "/admin/settings"}
              onClick={() => setIsVisible(false)}
            />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex h-screen w-full flex-col overflow-hidden bg-gray-100 px-5 lg:px-10">
          {/* TOP BAR */}
          <div className="flex h-20 items-center justify-between px-5">
            <div className="flex items-center gap-2">
              <p className="font-['Inter'] text-sm font-medium leading-6 text-gray-600">Admin</p>
              <FaAngleRight />
              <p className="font-['Inter'] text-sm font-medium leading-6 text-gray-600">
                Dashboard
              </p>
            </div>

            <IoIosLogOut
              className="text-2xl hover:cursor-pointer"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            />
          </div>

          {/* PAGE CONTENT */}
          <div className="h-full overflow-y-auto">
            <div className="mb-4 lg:hidden" onClick={handleClick}>
              <GiHamburgerMenu className="text-2xl" />
            </div>

            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}
