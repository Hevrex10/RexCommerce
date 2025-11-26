import React from "react";
import Navcard from "../component/Navcard";
import InputCard from "../component/InputCard";
import LoginButtonCard from "./LoginButtonCard";
import { NavLink } from "react-router-dom";

export default function ResetPassword() {
  return (
    <div>
      <>
        <Navcard main="" text="Reset Password" />
        <section className="flex justify-center items-center mt-10 mb-10">
          <form className="flex flex-col gap-7 max-w-80 w-full justify-center items-center my-25">
            <div className="flex flex-col gap-3 max-w-full w-full">
              <InputCard text="New Password" />
              <InputCard text="Confirm Password" />
            </div>
            <div className="flex flex-col gap-3 max-w-full w-full">
              <LoginButtonCard text="Login" />
            </div>
          </form>
        </section>
      </>
    </div>
  );
}
