import React from "react";
import Navcard from "../component/Navcard";
import InputCard from "../component/InputCard";
import LoginButtonCard from "./LoginButtonCard";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseCl";
import { useDispatch } from "react-redux";
import { setSession } from "../features/AuthSlice";

export default function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    dispatch(setSession(data.session));
    navigate("/");
  }

  async function handleSignwithGoogle() {
    let {error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
       if (error) {
      throw new Error(error.message);
    }
    
  }
  return (
    <>
      <Navcard text="Login" main="LOG IN" />
      <section className="flex justify-center items-center mt-10 mb-10">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-9 max-w-80 w-full justify-center items-center my-25"
        >
          <div onClick={handleSignwithGoogle} className="max-w-80 w-full px-6 py-3 bg-white rounded outline  outline-gray-400 flex justify-center items-center gap-2 hover:cursor-pointer">
            <img src="/images/Google.png" alt="" />
            <div className="justify-start text-gray-600 text-sm font-medium font-['Inter'] leading-6">
              Continue with Google
            </div>
          </div>
          <div className="max-w-80 w-full flex justify-center items-center gap-4">
            <div className="max-w-32 w-full h-0 outline outline-offset-[-0.50px] outline-gray-200" />
            <p className=" text-gray-600 text-xs font-medium font-['Inter'] leading-6 tracking-wide">
              OR
            </p>
            <div className="max-w-32 w-full h-0 outline  outline-offset-[-0.50px] outline-gray-200" />
          </div>
          <div className="flex flex-col gap-3 max-w-full w-full">
            <InputCard name="email" type="email" text="Email Address" />
            <InputCard name="password" text="password" type="password" />
          </div>
          <div className="flex flex-col gap-4 max-w-full w-full">
            <div className="flex justify-end max-w-full w-full">
              <NavLink
                to="/forgot-password"
                className="text-zinc-600 text-xs font-medium font-['Inter'] text-end leading-6"
              >
                Forgot Password?
              </NavLink>
            </div>
            <LoginButtonCard text="Login" />
          </div>
          <NavLink
            to="/sign-up"
            className=" text-gray-600 text-sm font-normal font-['Inter'] leading-6"
          >
            Don't have an account? Sign up
          </NavLink>
        </form>
      </section>
    </>
  );
}
