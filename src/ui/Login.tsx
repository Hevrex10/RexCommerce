import React from "react";
import LoginComponent from "../LoginPage/LoginComponent";
import { Outlet, useNavigation } from "react-router";
import Loader from "../component/Loader";

export default function Login() {
    const navigation = useNavigation()
    const isTrue = navigation.state === "loading";
  return (
    <>
    {isTrue && <Loader/>}
      <Outlet />
    </>
  );
}
