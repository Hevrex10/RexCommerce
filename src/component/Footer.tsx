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
    location.pathname === "/admin/settings" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin-login" ||
    location.pathname === "/admin/add-products" ||
    location.pathname.startsWith("/admin/edit-product/");

  return (
    <>
      {!hideFooter && (
        <footer className="w-full bg-neutral-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {!hideNewsletter && <NewsLetter />}

            <div className="bg:my-20 my-3 flex flex-col justify-between gap-10 px-4 py-10 md:my-14 md:px-8 lg:flex-row">
              <div className="flex w-full flex-col gap-8 lg:w-1/4">
                <div className="flex items-center gap-4">
                  <img src="/images/Logomark.png" alt="Logo" />
                  <p className="font-['Manrope'] text-xl font-extrabold capitalize leading-6 text-gray-900">
                    ecommerce
                  </p>
                </div>
                <p className="w-full font-['Inter'] text-sm font-normal leading-6 text-gray-600 lg:w-64">
                  DevCut is a YouTube channel for practical project-based learning.
                </p>
                <div className="flex gap-2.5">
                  <FaGithub className="text-2xl text-gray-600" />
                  <FaInstagram className="mx-4 text-2xl text-gray-600" />
                  <BsYoutube className="text-2xl text-gray-600" />
                </div>
              </div>

              <div className="flex w-full flex-col gap-16 sm:flex-row lg:w-auto">
                <FooterCard main="SUPPORT" sub1="FAQ" sub2="Terms of use" sub3="Privacy Policy" />
                <FooterCard main="COMPANY" sub1="About Us" sub2="Careers" sub3="Contact" />
                <FooterCard main="SHOP" sub1="My Account" sub2="CheckOut" sub3="Cart" />
              </div>

              {/* Payment Info */}
              <div className="flex w-full flex-col items-end justify-start gap-10 lg:w-1/4">
                <div className="font-['Inter'] text-sm font-medium leading-6 text-gray-500">
                  ACCEPTED PAYMENTS
                </div>
                <div className="flex gap-4 opacity-80">
                  <img className="grayscale" src="images/Mastercard.png" alt="mastercard" />
                  <img className="grayscale" src="images/Amex.png" alt="paypal" />
                  <img className="grayscale" src="images/Visa.png" alt="visa" />
                </div>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[1116px] gap-2.5 border-t border-neutral-100 py-7 text-center">
              <p className="font-['Inter'] text-sm font-normal leading-6 text-gray-600">
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
    <div className="bg:gap-10 flex flex-col items-start justify-start gap-4 sm:gap-6">
      <p className="pb-6 font-['Inter'] text-sm font-medium text-gray-500">{main}</p>
      <div className="flex flex-col items-start justify-start gap-4">
        <p className="font-['Inter'] text-sm font-medium leading-6 text-gray-600">{sub1}</p>
        <p className="font-['Inter'] text-sm font-medium leading-6 text-gray-600">{sub2}</p>
        <p className="font-['Inter'] text-sm font-medium leading-6 text-gray-600">{sub3}</p>
      </div>
    </div>
  );
}
