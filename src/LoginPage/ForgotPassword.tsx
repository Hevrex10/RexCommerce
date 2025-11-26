import React from "react";
import Navcard from "../component/Navcard";
import InputCard from "../component/InputCard";
import LoginButtonCard from "./LoginButtonCard";
import { NavLink } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div>
      <>
        <Navcard main="" text="Forgot Password" />
        <section className="flex justify-center items-center mt-10 mb-10">
          <form className="flex flex-col gap-7 max-w-80 w-full justify-center items-center my-25">
            <p className=" text-zinc-600 text-sm font-normal font-['Inter'] leading-6">
              Please enter the email address associated with your account. We'll promptly send you a
              link to reset your password.
            </p>
            <div className="flex flex-col gap-3 max-w-full w-full">
              <InputCard text="Password" />
            </div>
            <div className="flex flex-col gap-3 max-w-full w-full">
              <LoginButtonCard text="Login" />
            </div>
            <NavLink to="" className=" text-gray-600 text-sm font-normal font-['Inter'] leading-6">
              Don't have an account? Sign up
            </NavLink>
          </form>
        </section>
      </>
    </div>
  );
}
