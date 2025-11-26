import { useState } from "react";
import Navcard from "../component/Navcard";
import { GrCart } from "react-icons/gr";
import { IoHeartOutline } from "react-icons/io5";
import { PiTruckBold } from "react-icons/pi";
import { FiKey } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import Option from "./Option";
import { setSession } from "../features/AuthSlice";
import { supabase } from "../supabaseCl";
import { useDispatch} from "react-redux";
import {  Outlet, useLocation } from "react-router-dom";
import {Logout} from "./Option"
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";


export default function AccountPage() {
  const [isTrue,setIsTrue] = useState<boolean>(false)

  const location = useLocation();
  const path = location.pathname
  const dispatch = useDispatch();

  async function handleLogout() {
    await supabase.auth.signOut();
    dispatch(setSession(null));
  }

  function handleToggle(){
    setIsTrue(p => !p)
  }
  

  return (
    <>
  
      <Navcard text="My Account" main="ACCOUNT" />
      <div className="block px-10 pb-4 justify-center mt-15  lg:hidden" onClick={handleToggle}>
            {isTrue ? <RxHamburgerMenu/> : <RxCross1 />}
            </div > 
      <section className="flex justify-center items-center mb-29 lg:my-29  relative">
        
        <div className="flex max-w-[1092px] w-full ">
           
          <div className={`flex flex-col gap-5  md:w-50 sm:w-50 lg:w-68 px-6 py-8 justify-center absolute sm:relative bg-white $ ${isTrue ?"hidden" : "flex"} md:flex `}>
           
            <Option logo={<GrCart />} name="Orders" to="/account" bg={path === "/account"} />
            <Option logo={<IoHeartOutline />} name="Wishlist" to="/account/wishlist" bg={path === "/account/wishlist"} />
            <Option logo={<PiTruckBold />} name="Address" to="/account/address"  bg={path === "/account/address"}/>
            <Option logo={<FiKey />} name="Password" to="/account/password"  bg={path === "/account/password"}/>
            <Option logo={<FaRegUser />} name="User" to="/account/user"  bg={path === "/account/user"}/>
            <Logout logo={<IoIosLogOut />} name="Logout" onClick={handleLogout} />
          </div>
         
          <div className="flex flex-col gap-19 max-w-140 w-full overflow-y-auto max-h-[400px] px-2">
             
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}


