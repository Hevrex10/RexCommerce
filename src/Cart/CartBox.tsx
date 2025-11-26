import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity,setCart } from "../features/cartSlice";
import EmptyCart from "../component/EmptyCart";
import CartList from "./CartList";
import { supabase } from "../supabaseCl";

export default function CartBox() {
  const [continueShopping, setContinueShopping] = React.useState(false);

  function handleShopping() {
    setContinueShopping(true);
  }

  const { cartItems } = useSelector((state: any) => state.cart);

  const dispatch = useDispatch();
  

  async function handleDelete(id: number | string) {
    dispatch(removeFromCart(id));
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const { error } = await supabase.from("Cart").delete().eq("user_id", user.id).eq("product_id", id);
    if (error) {
      console.log("Error deleting item from cart:", error.message);
      return;
    }
  }

  function handleIncrease(id: number) {
    dispatch(increaseQuantity(id));
  }
  function handleDecrease(id: number) {
    dispatch(decreaseQuantity(id));
  }

  return (
    <div className="flex flex-col gap-4 max-w-[50%] w-full ">
      <p className=" text-gray-900 font-semibold font-['Inter']">Your cart</p>

      <div className="max-w-[628px] w-full h-0.5 bg-gray-200 " />
      {cartItems.length === 0 && <EmptyCart />}
      {cartItems.map((item: any) => (
        <CartList
          key={item.id}
          name={item.name}
          price={item.totalPrice}
          size={item.itemSize}
          quantity={item.quantity}
          image={item.image}
          color={item.itemColor}
          onClick={() => handleDelete(item.id)}
          handleIncrease={() => handleIncrease(item.id)}
          handleDecrease={() => handleDecrease(item.id)}
        />
      ))}
    </div>
  );
}
