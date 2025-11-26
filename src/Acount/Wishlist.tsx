import { useDispatch, useSelector } from "react-redux";
import ListCard from "../component/ListCard";
import { useLoaderData } from "react-router-dom";
import { Product } from "../Type/Type";
import { addToCart } from "../features/cartSlice";
import { fetchProducts } from "../Api/ProductApi";
import { useEffect } from "react";
import { supabase } from "../supabaseCl";

function Wishlist() {
  const products = useLoaderData() as Product[];
  const dispatch = useDispatch();
  const wishlist = useSelector((state: any) => state.wishlist.wishlist);
  
useEffect(() => {
  const syncWishList = async () => {
    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) return;
    if (wishlist.length === 0) return;

    const formatted = wishlist.map((item: any) => ({
      product_id: item.product_id,
      name: item.name,
      price: item.price,
      image: item.image,
      created_at: item.date ?? new Date().toISOString(),
      user_id: user.id,
    }));

    const { error: upsertError } = await supabase
      .from("Wishlist")
      .upsert(formatted, { onConflict: "user_id,product_id" });

    if (upsertError) {
      console.error("Wishlist sync failed:", upsertError.message);
    } else {
      console.log("Guest wishlist synced → Supabase OK");
    }
  };

  syncWishList();
}, [wishlist]);

  function handleAddToCart(id: string | number) {
    const product = products.find((p) => p.id === id);
    if (product) {
      const cartItem = {
        ...product,
        quantity: 1,
        totalPrice: product.price,
        itemColor: product.colors?.[0] || "default-color",
        itemSize: product.sizes?.[0] || "default-size",
      };
      dispatch(addToCart(cartItem));
    } else {
      console.error(`Product with id ${id} not found`);
    }
  }

  const wishItem = useSelector((state: any) => state.wishlist.wishlist);
  return (
    <>
      <p className=" text-gray-900 text-base font-semibold font-['Inter']">WishList</p>
      {wishItem.map((wish: any, index: number) => (
        <ListCard
          key={index}
          name={wish.name}
          date={wish.date}
          priceOrtext={""}
          stateOrprice={wish.price}
          text="Add to cart"
          image={wish.image}
          onClick={() => {
            handleAddToCart(wish.id);
          }}
        />
      ))}
    </>
  );
}

export default Wishlist;

export async function wishLoader() {
  const products = await fetchProducts();
  return products;
}
