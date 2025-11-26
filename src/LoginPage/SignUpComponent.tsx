import React from "react";
import Navcard from "../component/Navcard";
import InputCard from "../component/InputCard";
import LoginButtonCard from "./LoginButtonCard";
import { NavLink } from "react-router-dom";
import { supabase } from "../supabaseCl";

export default function SignUpComponent() {
  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: "user" },
      },
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm your account!");
    }
  }

  async function handleGoogleSignUp() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) alert(error.message);
  }
  return (
    <>
      <Navcard main="Sign Up" text="Sign Up" />
      <section className="flex justify-center items-center mt-10 mb-10">
        <div className="flex flex-col gap-9 max-w-80 w-full justify-center items-center my-25">
          <button
            onClick={handleGoogleSignUp}
            className="max-w-80 w-full px-6 py-3 bg-white rounded outline  outline-gray-400 flex justify-center items-center gap-2 hover:cursor-pointer"
          >
            <img src="/images/Google.png" alt="" />
            <div className="justify-start text-gray-600 text-sm font-medium font-['Inter'] leading-6">
              Continue with Google
            </div>
          </button>
          <div className="max-w-80 w-full flex justify-center items-center gap-4">
            <div className="max-w-32 w-full h-0 outline outline-offset-[-0.50px] outline-gray-200" />
            <p className=" text-gray-600 text-xs font-medium font-['Inter'] leading-6 tracking-wide">
              OR
            </p>
            <div className="max-w-32 w-full h-0 outline  outline-offset-[-0.50px] outline-gray-200" />
          </div>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-3 max-w-full w-full">
              <InputCard text="Name" name="name" />
              <InputCard text="Email" name="email" />
              <InputCard text="Password" name="password" type="password" />
            </div>
            <div className="flex flex-col gap-4 max-w-full w-full">
              <div className="flex justify-center items-center max-w-full w-full">
                <p className="text-zinc-600 text-xs font-medium font-['Inter'] leading-6">
                  By creating an account you agree with our Terms of Service, Privacy Policy
                </p>
              </div>
              <LoginButtonCard text="Login" />
            </div>
          </form>

          <NavLink
            to="/login"
            className=" text-gray-600 text-sm font-normal font-['Inter'] leading-6"
          >
            Already have an account? Sign up
          </NavLink>
        </div>
      </section>
    </>
  );
}
