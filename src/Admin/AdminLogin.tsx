import React from "react";
import InputCard from "../component/InputCard";
import { useNavigate } from "react-router-dom";
import LoginButtonCard from "../LoginPage/LoginButtonCard";
import { supabase } from "../supabaseCl";
import { useDispatch, useSelector } from "react-redux";
import { setRole, setSession } from "../features/AuthSlice";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message + "Login failed");
    }

    dispatch(setSession(data.session));

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;

    const role = user?.user_metadata?.role;

    dispatch(setRole(role));

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }
  return (
    <section className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLog}
        className="mx-auto flex h-full max-h-[453px] w-full max-w-96 flex-col items-center justify-center gap-16 bg-white px-5"
      >
        <div className="flex w-full max-w-80 items-center justify-center gap-2 bg-white px-6 py-3 hover:cursor-pointer">
          <div className="flex gap-2 font-['Inter'] text-sm font-medium leading-6 text-gray-600">
            <img src="/images/Logo.png" alt="Logo" />
            <p className="justify-start font-['Manrope'] text-xl font-extrabold capitalize leading-6 text-gray-900">
              Admin
            </p>
          </div>
        </div>

        <div className="flex w-full max-w-full flex-col items-center gap-11">
          <div className="flex w-full flex-col gap-5">
            <InputCard name="email" type="email" text="Email Address" />
            <InputCard name="password" text="password" type="password" />
          </div>
          <LoginButtonCard text="Login" />
        </div>
      </form>
    </section>
  );
}
