import React from "react";
import CartComponent from "../Cart/CartComponent";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../component/Loader";
import { fetchCart } from "../Api/ProductApi";

export default function Cart() {
  const navigation = useNavigation();
  const isTrue = navigation.state === "loading";
   
  return (
    <>
      {isTrue && <Loader />}
      <CartComponent />
    </>
  );
}

