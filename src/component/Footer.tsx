import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import NewsLetter from "./NewsLetter";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const hideNewsletter =
    location.pathname === "/cart" ||
    location.pathname === "/login" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/cart/shipping" ||
    location.pathname === "/order-success" ||
    location.pathname === "/order-error";
  const hideFooter =
    location.pathname === "/admin" ||
    location.pathname === "/admin/products" ||
    location.pathname === "/admin/orders" ||
    location.pathname === "/admin/customers" ||
    location.pathname === "/admin/reviews" ||
    location.pathname === "/admin/settings"||
     location.pathname === "/admin/dashboard"||
     location.pathname === "/admin-login"||
     location.pathname === "/admin/add-products"


  return (
    <>
      {!hideFooter && (
        <footer className="w-full bg-neutral-100 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!hideNewsletter && <NewsLetter />}

            <div className="flex flex-col lg:flex-row justify-between px-4 md:px-8 my-3  md:my-14 bg:my-20  py-10 gap-10">
              <div className="flex flex-col gap-8 w-full lg:w-1/4">
                <div className="flex items-center gap-4">
                  <img src="/images/Logomark.png" alt="Logo" />
                  <p className="text-gray-900 text-xl font-extrabold font-['Manrope'] capitalize leading-6">
                    ecommerce
                  </p>
                </div>
                <p className="text-gray-600 text-sm font-normal font-['Inter'] leading-6 w-full lg:w-64">
                  DevCut is a YouTube channel for practical project-based learning.
                </p>
                <div className="flex gap-2.5">
                  <FaGithub className="text-gray-600 text-2xl" />
                  <FaInstagram className="text-gray-600 text-2xl mx-4" />
                  <BsYoutube className="text-gray-600 text-2xl" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-16 w-full lg:w-auto">
                <FooterCard main="SUPPORT" sub1="FAQ" sub2="Terms of use" sub3="Privacy Policy" />
                <FooterCard main="COMPANY" sub1="About Us" sub2="Careers" sub3="Contact" />
                <FooterCard main="SHOP" sub1="My Account" sub2="CheckOut" sub3="Cart" />
              </div>

              {/* Payment Info */}
              <div className="flex flex-col justify-start items-end gap-10 w-full lg:w-1/4">
                <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-6">
                  ACCEPTED PAYMENTS
                </div>
                <div className="opacity-80 flex gap-4">
                  <img className="grayscale" src="images/Mastercard.png" alt="mastercard" />
                  <img className="grayscale" src="images/Amex.png" alt="paypal" />
                  <img className="grayscale" src="images/Visa.png" alt="visa" />
                </div>
              </div>
            </div>
            <div className="max-w-[1116px] w-full py-7 border-t border-neutral-100 gap-2.5 mx-auto text-center">
              <p className="text-gray-600 text-sm font-normal font-['Inter'] leading-6">
                © 2025 ADEAGBO. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

type FooterCardProps = {
  main: string;
  sub1: string;
  sub2: string;
  sub3: string;
};

function FooterCard({ main, sub1, sub2, sub3 }: FooterCardProps) {
  return (
    <div className="flex flex-col justify-start items-start gap-4 sm:gap-6   bg:gap-10">
      <p className="text-gray-500 text-sm font-medium font-['Inter'] pb-6">{main}</p>
      <div className="flex flex-col justify-start items-start gap-4">
        <p className="text-gray-600 text-sm font-medium font-['Inter'] leading-6">{sub1}</p>
        <p className="text-gray-600 text-sm font-medium font-['Inter'] leading-6">{sub2}</p>
        <p className="text-gray-600 text-sm font-medium font-['Inter'] leading-6">{sub3}</p>
      </div>
    </div>
  );
}
