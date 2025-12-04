import React, { useState } from "react";
import { NavLink, useLoaderData, useParams } from "react-router-dom";
import { fetchProducts } from "../Api/ProductApi";
import { Product } from "../Type/Type";
import { FaAngleRight } from "react-icons/fa";
import Details from "./Details";
import ProductsCard from "./ProductsCard";
import { IoMdStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setIsColor, setSelected, setSize, setItemColor } from "../features/uiSlice";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { supabase } from "../supabaseCl";
import { addToWishlist, removeFromWishlist } from "../features/WishSlice";
import useCartHandler from "../Cart/CartHandler";
import { removeFromCart } from "../features/cartSlice";
import NotificationCard from "../Notification/NotificationCard";

export default function ProductDetail() {
  const param = useParams();
  const loader: any = useLoaderData();
  const like = loader.slice(6, 10);
  const product = loader.map((p: {}) => p).find((p: any) => Number(p.id) === Number(param.id));
  const productName = product.name;

  return (
    <>
      <div
        data-show-title="false"
        className="mx-auto my-4 flex h-7 w-full max-w-[1116px] flex-col items-start justify-center gap-2 px-3"
      >
        <div className="flex items-center justify-start gap-1 rounded">
          <NavLink
            to="/"
            className="justify-start font-['Inter'] text-sm font-medium leading-6 text-gray-600"
          >
            Ecommerce
          </NavLink>

          <FaAngleRight className="text-gray-600" />

          <p className="font-['Inter'] text-sm font-medium leading-6 text-gray-900">
            {productName}
          </p>
        </div>
      </div>
      <ProductInfo like={like} />
    </>
  );
}

export function ProductInfo({ like }: any) {
  const [liked, setLiked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const dispatch = useDispatch();
  const { isColor, selected, itemSize, itemColor } = useSelector((state: any) => state.ui);

  const cartListItem = useSelector((state: any) => state.cart.cartItems);

  const param = useParams();
  const loader: any = useLoaderData() as { loader: Product[] };

  const product: Product = loader
    .map((p: {}) => p)
    .find((p: any) => Number(p.id) === Number(param.id));

  const { sizes, price, instock, colors, name, image, id } = product;

  const isInCart = cartListItem.find((item: any) => item.id === id);
  const wishlist = useSelector((state: any) => state.wishlist.wishlist);

  useEffect(() => {
    if (isInCart) {
      setShowNotification(true);

      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isInCart]);

  useEffect(() => {
    setQuantity(1);
    dispatch(setIsColor(false));
    dispatch(setSelected(null));
    dispatch(setItemColor(""));
    dispatch(setSize(""));
    setMessage("");
    setWarning("");
  }, [param.id, dispatch]);

  function increase() {
    setQuantity(quantity + 1);
  }
  function decrease() {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  }

  function handleColor(id: number, color: string) {
    dispatch(setIsColor(id));
    dispatch(setItemColor(color));
  }

  function handleSelect(id: number, size: string) {
    dispatch(setSelected(selected === id ? null : id));
    dispatch(setSize(size));
  }

  const { handleCart, message, warning, setMessage, setWarning, setQuantity, quantity } =
    useCartHandler();

  async function handleWishList() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const likedProduct = {
      product_id: id,
      name: name,
      date: new Date().toISOString(),
      price: price,
      image: image,
    };

    if (liked) {
      dispatch(removeFromWishlist(id));
      setLiked(false);

      const { error } = await supabase
        .from("Wishlist")
        .delete()
        .eq("product_id", id)
        .eq("user_id", user.id);
    } else {
      dispatch(addToWishlist(likedProduct));
      setLiked(true);

      const { data, error } = await supabase.from("Wishlist").upsert(
        [
          {
            product_id: id,
            name,
            created_at: new Date().toLocaleString(),
            price,
            image,
            user_id: user.id,
          },
        ],
        { onConflict: "user_id,product_id" }
      );
      if (error) console.error(" Wishlist sync error:", error.message);
      else console.log(" Wishlist synced:", data);
    }
  }

  useEffect(() => {
    const lovedItems = wishlist.find((item: any) => item.product_id === id);
    setLiked(!!lovedItems);
  }, [wishlist, id]);

  // const yaya = (!itemColor && !itemSize) || (
  //   <NotificationCard text="Please select both color and size before adding to cart" />
  // );

  return (
    <>
      <div className="gid-cols-1 gap-30 mx-auto w-full max-w-[1092px] px-5 lg:grid lg:grid-cols-2">
        <div className="flex justify-center">
          <img src={image} alt={name} />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-center font-['Inter'] text-2xl font-bold text-gray-900">{name}</p>
              <img src="/images/Vector.png" />
            </div>

            <div className="flex items-center justify-start gap-2 rounded-[100px] pr-2">
              <div className="flex items-start justify-start gap-2 rounded-[100px] bg-neutral-100 px-4 py-0.5 outline outline-neutral-100">
                <div className="inline-flex h-6 w-6 flex-col items-center justify-center gap-2.5 px-0.5 py-[3px]">
                  <IoMdStar className="text-gray-600" />
                </div>
                <p className="justify-start font-['Inter'] text-xs font-medium capitalize leading-6 text-gray-600">
                  4.2 — 54 Reviews
                </p>
              </div>
              <div className="flex items-start justify-start gap-2 rounded-[100px] px-4 py-0.5 outline outline-gray-200">
                <p className="font-['Inter'] text-xs font-medium capitalize leading-6 text-gray-600">
                  {instock ? "INSTOCK" : "OUT OF STOCK"}
                </p>
              </div>
            </div>
          </div>

          <p className="font-['Inter'] text-lg font-semibold text-gray-900">${price}</p>

          <div className="flex flex-col items-start gap-2">
            <p className="text-center font-['Inter'] text-xs font-medium uppercase leading-6 tracking-wide text-gray-600">
              Available Colors
            </p>

            <div className="flex items-center justify-center gap-2.5">
              {colors.map((color, index) => (
                <Circle
                  key={index}
                  bg={color}
                  onClick={() => handleColor(index, color)}
                  isActive={isColor === index}
                  isColor={isColor}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-['Inter'] text-xs font-medium uppercase leading-6 tracking-wide text-gray-600">
              Select Size
            </div>

            <div className="flex items-end justify-start gap-2">
              {sizes.map((size: any, index: number) => (
                <SizeOption
                  key={index}
                  size={size}
                  onClick={() => handleSelect(index, size)}
                  selected={selected === index}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-['Inter'] text-xs font-medium uppercase leading-6 text-gray-600">
              Quantity
            </div>
            <div className="max-w-30 flex h-11 items-center justify-around rounded outline outline-gray-200">
              <div className="flex items-center">
                <button
                  onClick={decrease}
                  className="font-['Inter'] text-[18px] font-medium text-gray-800 hover:cursor-pointer"
                >
                  -
                </button>
              </div>
              <div className="flex items-center">
                <p className="text-1xl font-['Inter'] text-sm font-medium text-gray-800">
                  {quantity}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={increase}
                  className="font-['Inter'] text-[16px] font-medium text-gray-800 hover:cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <button
                onClick={() => handleCart({ id, price, name, image, quantity })}
                className="flex w-72 items-center justify-center gap-1.5 rounded bg-gray-900 px-6 py-3 hover:cursor-pointer"
              >
                <p className="font-['Inter'] text-sm font-medium leading-6 text-white">
                  Add to cart
                </p>
              </button>
              <button onClick={handleWishList} className="transition-colors duration-200">
                {liked ? (
                  <FaHeart className="text-xl text-red-500" />
                ) : (
                  <FaRegHeart className="text-xl text-gray-400 hover:text-red-500" />
                )}
              </button>
            </div>
            <p className="font-['Inter'] text-xs font-medium uppercase text-gray-600">
              — Free shipping on orders $100+
            </p>
            <div className="flex flex-col gap-1">
              <p className="font-['Inter'] text-xs font-medium uppercase text-blue-600">
                {message}
              </p>
              <p className="font-['Inter'] text-xs font-medium uppercase text-red-600">{warning}</p>

              {showNotification && <NotificationCard text="Added to cart" />}
            </div>
          </div>
        </div>
      </div>
      <Details product={product} />

      <section className="my-40 flex max-w-full justify-center">
        <div className="inline-flex w-full max-w-[1092px] flex-wrap content-center items-center justify-between overflow-hidden">
          {like.map((p: Product) => (
            <ProductsCard
              key={p.id}
              productName={p.name}
              id={p.id}
              src={p.image}
              price={p.price}
              stock={p.instock ? "INSTOCK" : "OUT OF STOCK"}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export function Circle({
  bg,
  onClick,
  isActive,
  color,
}: {
  bg?: string;
  onClick?: any;
  isColor?: number | boolean;
  isActive?: boolean;
  color?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center gap-2 rounded-[100px] ${isActive ? "outline-1" : ""}`}
    >
      <div className={`h-6 w-6 ${bg} bg-${color} rounded-[100px]`} />
    </div>
  );
}

export function SizeOption({
  size,
  onClick,
  selected,
}: {
  size: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 min-w-10 flex-col items-center justify-center overflow-hidden rounded outline hover:cursor-pointer ${selected ? "outline-gray-900" : "outline-gray-400"}`}
    >
      <p className="justify-start text-center font-['Inter'] text-xs font-medium capitalize leading-6 text-gray-900">
        {size}
      </p>
    </button>
  );
}

export async function productDetailLoader() {
  const products = await fetchProducts();
  return products;
}
