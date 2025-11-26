import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { supabase } from "../supabaseCl";
import AdminOption from "./AdminOption";

export default function AdminPage() {

  const location = useLocation()
  return (
    <main className="flex max-w-full ">
      <section className="flex max-w-full w-full ">
        <div className="flex flex-col h-screen max-w-68 w-full gap-10  border-r border-gray-200   ">
          <div className="flex gap-2 justify-center items-center h-20 ">
            <div className="flex gap-3 items-center ">
              <img src="/images/Logo.png" alt="Logo" />
             <p className=" text-gray-900 text-xl font-extrabold font-['Manrope'] capitalize leading-6">Admin</p>
            </div>
          </div>

          <div className="flex flex-col gap-5 justify-center px-4">
            <AdminOption
              logo="/images/Dashboard.svg"
              name="Dashboard"
              to="/admin/dashboard"
              bg={location.pathname === "/admin/dashboard"}
            />
            <AdminOption
              logo="/images/Product.svg"
              name="Products"
              to="/admin/products"
              bg={location.pathname === "/admin/products"}
            />
            <AdminOption
              logo="/images/Cart.svg"
              name="Orders"
              to="/admin/orders"
              bg={location.pathname === "/admin/orders"}
            />
            <AdminOption
              logo="/images/Users.svg"
              name="Customers"
              to="/admin/customers"
              bg={location.pathname === "/admin/customers"}
            />
            <AdminOption
              logo="/images/Empty Star.svg"
              name="Reviews"
              to="/admin/reviews"
              bg={location.pathname === "/admin/reviews"}
            />
            <AdminOption
              logo="/images/Settings.svg"
              name="Settings"
              to="/admin/settings"
              bg={location.pathname === "/admin/settings"}
            />
          </div>
        </div>

        <div className="w-full flex flex-col bg-gray-100 px-10">
          <div className="flex justify-between px-5 items-center ">
            <div className="flex gap-2 justify-center items-center h-20  ">
              <p className=" text-gray-600 text-sm font-medium font-['Inter'] leading-6">Admin</p>
              <FaAngleRight />
              <p className=" text-gray-600 text-sm font-medium font-['Inter'] leading-6">
                Dashboard
              </p>
            </div>
               <IoIosLogOut className="text-2xl hover:cursor-pointer" onClick={async()=>{let { error } = await supabase.auth.signOut()}}/>
          </div>
          <div className="h-full ">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}


