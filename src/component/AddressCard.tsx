import React from "react";
import InputBox from "./InputBox";

export default function AddressCard() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="justify-start text-zinc-600 text-sm font-medium font-['Inter'] leading-6">
          Street Address
        </p>
        <InputBox name="address" text="" required={true} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <InputBox name="city" text="City" required={true} />
        <InputBox name="state" text="State" required={true} />
        <InputBox name="zipCode" text="Zip Code" required={false}  />
        <InputBox name="country" text="Country" required={true} />
      </div>
    </>
  );
}
