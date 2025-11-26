import React from "react";
import InputBox from "../component/InputBox";
import AddressCard from "../component/AddressCard";

export default function ShippingAddress() {
  return (
    <div className="flex flex-col gap-10 max-w-[534px]  w-full">
      <p className=" text-gray-900 font-semibold font-['Inter']">Shipping Address</p>
      <div className="flex flex-col gap-5">
        <AddressCard />
      </div>
      <div className="flex gap-3 flex-wrap">
        <InputBox name="email" text="Email Address" required={true} />
        <InputBox name="fullname" text="Full Name" required={true} />
      </div>
    </div>
  );
}
