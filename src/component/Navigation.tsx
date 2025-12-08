import  { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useNavigation, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IoIosMenu } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import NavAccess from "./NavAccess";

export default function Navigation() {
  const location = useLocation();
  const hideFooter =
    location.pathname === "/admin" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin/products" ||
    location.pathname === "/admin/orders" ||
    location.pathname === "/admin/customers" ||
    location.pathname === "/admin/reviews" ||
    location.pathname === "/admin/settings" ||
    location.pathname === "/admin-login" ||
    location.pathname === "/admin/add-products" ||
    location.pathname.startsWith("/admin/edit-product/");
    
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
      {showPrompt && <NavAccess setShowPrompt={setShowPrompt} />}
      {!hideFooter && (
        <>
          <div
            ref={promoRef}
            className="z-index-500 flex h-10 items-center justify-center bg-gray-900"
          >
            <div className="flex flex-col gap-1 text-center sm:flex-row sm:gap-4 sm:text-left">
              <p className="font-['Inter'] text-sm font-normal text-white">
                Get 25% OFF on your first order.
              </p>
              <p className="font-['Inter'] text-sm font-medium text-white">Order Now</p>
            </div>
          </div>

          <section
            className={`w-full max-w-[2400px] transition-all duration-300 ${isSticky ? "z-9999 fixed top-0 shadow-md" : "relative"}`}
          >
            <nav className="relative flex justify-center bg-white shadow">
              <div className="md:gap-15 relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:gap-10 sm:px-6 lg:gap-20 lg:px-8">
                <div className="flex items-center gap-3">
                  <img src="/images/Logomark.png" alt="Logo" className="h-10 w-10" />
                  <NavLink
                    to="/"
                    className="font-['Manrope'] text-[15px] font-extrabold capitalize text-gray-900 sm:text-[15px] lg:text-[20px]"
                  >
                    REXcommerce
                  </NavLink>
                </div>

                <div
                  className={`${showNav ? "flex" : "hidden lg:flex"} z-9999 absolute right-1 top-20 flex h-[50vh] w-full max-w-[1400px] flex-col items-center gap-6 bg-white/80 font-['Inter'] text-sm font-medium text-gray-600 backdrop-blur-sm md:h-[50vh] md:w-full lg:static lg:right-auto lg:top-auto lg:h-auto lg:w-auto lg:flex-row lg:gap-8 lg:bg-transparent lg:backdrop-blur-0`}
                >
                  <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-10">
                    <NavLink to="/" onClick={() => setShowNav(false)} className="hover:text-gray-900">
                      Home
                    </NavLink>

                    <div className="flex cursor-pointer items-center gap-1 hover:text-gray-900">
                      <NavLink  onClick={() => setShowNav(false)} to="/products">Categories</NavLink>
                      <FaAngleDown className="text-[1rem] text-gray-600" />
                    </div>

                    <NavLink  onClick={() => setShowNav(false)} to="/about" className="hover:text-gray-900">
                      About
                    </NavLink>

                    <NavLink  onClick={() => setShowNav(false)} to="/contact" className="hover:text-gray-900">
                      Contact
                    </NavLink>

                    <div className="relative w-full max-w-xs lg:max-w-64">
                      <input
                        type="text"
                        placeholder="Search products"
                        className="w-full rounded-md px-10 py-2.5 font-['Inter'] text-sm font-medium text-gray-500 outline outline-gray-200"
                      />
                      <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-600" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex gap-5">
                    <button className="relative" onClick={goToCart}>
                      <img src="/images/Icon.png" alt="cart" className="h-6 w-6" />
                      <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500">
                        <p className="text-center font-['Inter'] text-xs font-bold text-black">
                          {cartLength}
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={goToAccount}
                      className="flex h-6 w-6 items-center justify-center"
                    >
                      <FaRegUserCircle className="text-[1.25rem] text-gray-600" />
                    </button>
                  </div>

                  <div className="flex items-center lg:hidden" onClick={handleNav}>
                    {showNav ? (
                      <LiaTimesSolid className="text-3xl text-gray-600" />
                    ) : (
                      <IoIosMenu className="text-3xl text-gray-600" />
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </section>
        </>
      )}
      {isSticky && <div className="h-20 w-full" />}
    </>
  );
}
