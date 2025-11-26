import React, { useEffect, useRef } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseCl";
import OrderSummary from "./OrderSummary";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";

export default function CartComponent() {
  const guestCart = useSelector((state: any) => state.cart.cartItems);

  const isSyncing = useRef(false);
  const syncTimeout = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (syncTimeout.current) clearTimeout(syncTimeout.current);

    syncTimeout.current = setTimeout(async () => {
      if (isSyncing.current) return;
      isSyncing.current = true;

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.log("User not logged in. Skipping sync.");
          isSyncing.current = false;
          return;
        }

        if (guestCart.length > 0) {
          const formattedCart = guestCart.map((item: any) => ({
            user_id: user.id,
            product_id: item.id,
            quantity: item.quantity,
            itemSize: item.itemSize || "Default",
            itemColor: item.itemColor || "Default",
            totalprice: item.totalPrice,
            price: item.price,
          }));

          const { data, error } = await supabase
            .from("Cart")
            .upsert(formattedCart, { onConflict: "user_id,product_id" });

          if (error) {
            console.error(" Supabase cart sync error:", error.message);
          } else {
            console.log(" Cart synced successfully:", data);
          }
        } else {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            await supabase.from("Cart").delete().eq("user_id", user.id);
            console.log("🗑️ Cleared cart on Supabase for empty guestCart.");
          }
        }
      } catch (err) {
        console.error("⚠️ Cart sync failed:", err);
      } finally {
        isSyncing.current = false;
      }
    }, 2000);

    return () => {
      if (syncTimeout.current) clearTimeout(syncTimeout.current);
    };
  }, [guestCart]);

  const { subTotal, tax, total } = useSelector((state: any) => state.cart);

  const cartList = useSelector((state: any) => state.cart.cartItems);
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formDate = new FormData(e?.currentTarget);
    const data = Object.fromEntries(formDate) as Record<string, string>;

    const { address, city, country, email, fullname, state, zipCode: zipcode } = data || {};

    const { error } = await supabase.from("Orders").insert([
      {
        user_id: user.id,
        fullname,
        email,
        address,
        city,
        state,
        country,
        zipcode,
        subtotal: subTotal,
        tax,
        total,
        orderitems: cartList,
        created_at: new Date().toLocaleString(),
      },
    ]);
  
      const { data:adData, error:adError } = await supabase.auth.updateUser({
        data: {
          address: address,
        },
      });

      if (error) {
        console.log("Error updating address:", adError);
      } else {
        console.log("Address updated:", adData);
      }
    
    if (error) {
      console.log("ORDER ERROR", error);
      navigate("/order-error");
    }


    dispatch(clearCart());
    navigate("/order-success");

    await supabase.from("Cart").delete().eq("user_id", user.id);
    console.log("🗑️ Cleared cart on Supabase for empty guestCart.");

    e.currentTarget.reset();
  }

  return (
    <main className="gap-15 flex max-w-full flex-col bg-white">
      <section className="flex max-w-full items-center justify-center bg-neutral-100">
        <div className="my-12 flex w-full max-w-[1116px] flex-col items-start justify-center gap-2 px-3">
          <p className="font-['Inter'] text-2xl font-bold text-gray-900">Cart</p>
          <div className="flex items-center justify-start gap-1 rounded">
            <NavLink to="/" className="font-['Inter'] text-sm font-medium leading-6 text-gray-600">
              Ecommerce
            </NavLink>
            <FaAngleRight className="text-gray-600" />
            <p className="font-['Inter'] text-sm font-medium leading-6 text-gray-900">Cart</p>
          </div>
        </div>
      </section>

      <section className="flex max-w-full justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[1092px] flex-col justify-between gap-6 px-5 sm:flex-col md:flex-row lg:flex-row"
        >
          {/* Cart Items */}
          <Outlet />

          <OrderSummary />
        </form>
      </section>
    </main>
  );
}
