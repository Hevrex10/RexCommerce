import React from "react";
import Summary from "./CartSummary";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function OrderSummary() {
  const [continueShopping, setContinueShopping] = React.useState(false);

  const user = useSelector((state: any) => state.auth.user);

  const { subTotal, tax, total } = useSelector((state: any) => state.cart);
  const disable = subTotal === 0;

  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cart.cartItems);
  function handleShopping() {
    setContinueShopping(true);
    navigate("/cart/shipping");
  }

  return (
    <div className="rounded outline outline-gray-200 flex flex-col justify-center gap-8 max-w-[400px] w-full py-8 px-5">
      <p className="text-gray-900 text-base font-semibold font-['Inter']">Order Summary</p>

      <div className="flex flex-col gap-5">
        <Summary text="Subtotal" price={subTotal} />
        <Summary text="Shipping" price={"Free"} />
        <Summary text="Tax" price={tax} />
      </div>

      <div className="max-w-[628px] w-full h-1 bg-gray-200" />
      <Summary text="Total" price={total} />

      <div className="flex items-center gap-6 justify-center flex-col">
        {continueShopping ? (
          <button
            disabled={disable}
            type="submit"
            className={`max-w-80 w-full px-6 py-2 rounded flex justify-center items-center hover:cursor-pointer ${disable ? " bg-gray-400" : "bg-gray-900"}`}
          >
            <p className="text-white text-sm font-medium font-['Inter'] leading-6">Place Order</p>
          </button>
        ) : (
          <button
            onClick={handleShopping}
            className="max-w-80 w-full px-6 py-2 bg-gray-900 rounded flex justify-center items-center hover:cursor-pointer "
          >
            <p className="text-white text-sm font-medium font-['Inter'] leading-6 :">Checkout</p>
          </button>
        )}

        <p
          className={`text-gray-900 text-xs font-medium font-['Inter'] underline leading-4 text-center ${
            continueShopping ? "hidden" : ""
          }`}
        >
          Continue Shopping
        </p>
      </div>
    </div>
  );
}
