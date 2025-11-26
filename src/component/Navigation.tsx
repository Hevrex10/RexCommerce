import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useNavigation, Link, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Loader from "./Loader";
import { IoIosMenu } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import NavAccess from "./NavAccess";

export default function Navigation() {

     const location = useLocation();
     const hideFooter = location.pathname === "/admin" || location.pathname === "/admin/dashboard" || location.pathname === "/admin/products" || location.pathname === "/admin/orders" || location.pathname === "/admin/customers" || location.pathname === "/admin/reviews" || location.pathname === "/admin/settings" ||  location.pathname === "/admin-login" || location.pathname ==="/admin/add-products"

     

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isTrue = navigation.state === "loading";

  const { user } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: any) => state.cart);
  const cartLength = cartItems.length;

  const [showPrompt, setShowPrompt] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showNav, setShowNav] = useState(false);

  function handleNav() {
    setShowNav((p) => !p);
  }

  const promoRef = useRef<HTMLDivElement>(null);

  function goToCart() {
    if (!user) return setShowPrompt(true);
    navigate("/cart");
  }

  function goToAccount() {
    if (!user) return setShowPrompt(true);
    navigate("/account");
  }

  useEffect(() => {
    if (!promoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(promoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {showPrompt && (
       <NavAccess setShowPrompt={setShowPrompt}/>
      )}
    {!hideFooter && 
  <>
      <div ref={promoRef} className="h-10 flex justify-center items-center bg-gray-900 z-index-500">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-center sm:text-left">
          <p className="text-white text-sm font-normal font-['Inter']">
            Get 25% OFF on your first order.
          </p>
          <p className="text-white text-sm font-medium font-['Inter']">Order Now</p>
        </div>
      </div>

      <section
        className={`max-w-[2400px] w-full transition-all duration-300 ${isSticky ? "fixed top-0 z-9999 shadow-md" : "relative"}`}
      >
        <nav className="bg-white shadow flex justify-center relative">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 lg:gap-20 md:gap-15 sm:gap-10 relative">
            <div className="flex items-center gap-3 ">
              <img src="/images/Logomark.png" alt="Logo" className="w-10 h-10" />
              <NavLink
                to="/"
                className="text-gray-900 lg:text-[20px] sm:text-[15px] text-[15px] font-extrabold font-['Manrope'] capitalize "
              >
                REXcommerce
              </NavLink>
            </div>

            <div
              className={`${showNav ? "flex" : "hidden lg:flex"} absolute top-20 right-1 h-[50vh] max-w-[1400px] w-full z-9999 flex flex-col gap-6 bg-white/80 backdrop-blur-sm items-center text-gray-600 text-sm font-medium font-['Inter'] md:w-full md:h-[50vh] lg:static lg:top-auto lg:right-auto lg:h-auto lg:w-auto lg:flex-row lg:bg-transparent lg:backdrop-blur-0 lg:gap-8 `}
            >
              <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-10">
                <NavLink to="/" className="hover:text-gray-900">
                  Home
                </NavLink>

                <div className="flex items-center gap-1 hover:text-gray-900 cursor-pointer">
                  <NavLink to="/products">Categories</NavLink>
                  <FaAngleDown className="text-gray-600 text-[1rem]" />
                </div>

                <NavLink to="/" className="hover:text-gray-900">
                  About
                </NavLink>

                <NavLink to="/" className="hover:text-gray-900">
                  Contact
                </NavLink>

                <div className="relative w-full max-w-xs lg:max-w-64">
                  <input
                    type="text"
                    placeholder="Search products"
                    className="w-full px-10 py-2.5 rounded-md outline outline-gray-200 text-gray-500 text-sm font-medium font-['Inter']"
                  />
                  <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className=" flex items-center gap-6">
              <div className="flex gap-5">
                <button className="relative" onClick={goToCart}>
                  <img src="/images/Icon.png" alt="cart" className="w-6 h-6" />
                  <div className="w-5 h-5 bg-gray-500 rounded-full flex justify-center items-center absolute -top-2 -right-2">
                    <p className="text-black text-xs font-bold font-['Inter'] text-center">
                      {cartLength}
                    </p>
                  </div>
                </button>
                <button onClick={goToAccount} className="w-6 h-6 flex justify-center items-center">
                  <FaRegUserCircle className="text-gray-600 text-[1.25rem]" />
                </button>
              </div>

              <div className="lg:hidden flex items-center" onClick={handleNav}>
                {showNav ? (
                  <LiaTimesSolid className="text-3xl text-gray-600 " />
                ) : (
                  <IoIosMenu className="text-3xl text-gray-600 " />
                )}
              </div>
            </div>
          </div>
        </nav>
      </section>
      </>
}
      {isSticky && <div className="h-20 w-full" />}
              
    </>
  );
}
