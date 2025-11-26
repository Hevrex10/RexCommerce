import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosStarOutline } from "react-icons/io";
import { Product } from "../Type/Type";
import { FaAngleDown } from "react-icons/fa6";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function Details({ product }: { product: Product }) {
  const [selected, setSelected] = useState<"Review" | "Details">("Review");
  // console.log(product)
  const { detail } = product;

  return (
    <section className="max-w-6xl mx-auto my-20 flex flex-col md:flex-row gap-10 px-4">
      <aside className="w-full md:w-1/4 flex flex-col items-start">
        <div className="flex flex-col gap-3 pt-4 w-full">
          <button
            onClick={() => setSelected("Details")}
            className={`px-6 py-2 rounded-lg flex items-center gap-2.5 w-full ${
              selected === "Details"
                ? "bg-neutral-100 text-gray-900 font-semibold"
                : "hover:bg-neutral-100 text-gray-600"
            }`}
          >
            <HiOutlineDotsHorizontal />
            <p className="text-sm font-medium font-['Inter'] leading-6">Details</p>
          </button>

          <button
            onClick={() => setSelected("Review")}
            className={`px-6 py-2 rounded-lg flex items-center gap-2.5 w-full ${
              selected === "Review"
                ? "bg-neutral-100 text-gray-900 font-semibold"
                : "hover:bg-neutral-100 text-gray-600"
            }`}
          >
            <IoIosStarOutline />
            <p className="text-sm font-medium font-['Inter'] leading-6">Reviews</p>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col gap-4 min-h-[400px]">
        <h2 className="text-gray-900 text-base font-semibold font-['Inter']">
          {selected === "Details" ? "Product Details" : "Customer Reviews"}
        </h2>

        <div className="text-gray-600 text-sm font-normal font-['Inter'] leading-6">
          {selected === "Details" && <p className="whitespace-pre-line">{detail}</p>}
          {selected === "Review" && <Review product={product} />}
        </div>
      </main>
    </section>
  );
}

function Review({ product }: { product: Product }) {
  const reviews = product.reviews;
  return (
    <div className="w-full max-w-3xl flex flex-col gap-6">
      <div className="border-b pb-6 border-zinc-300">
        <div className="flex gap-3 pb-6">
          <span className="text-3xl font-bold text-gray-900 leading-14">
            <p> 4.2 </p>
          </span>
          <span className="text-sm text-zinc-500 flex items-center justify-center">
            <p>— 54 Reviews</p>{" "}
          </span>
        </div>

        <button className=" px-6 py-3 border border-gray-900 rounded font-medium text-sm ">
          Write a review
        </button>
        <div className="flex justify-end">
          <span className="flex items-center gap-2">
            {" "}
            <p>Sort By</p> <FaAngleDown />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {reviews.map((review, index) => (
          <ReviewCard name={review.user} date={review.date} text={review.comment} rating={review.rating} key={index} />
        ))}
      </div>

      <button className="self-center px-6 py-3 border border-gray-400 rounded text-gray-600 text-sm font-medium hover:cursor-pointer hover:scale-105 transform transition duration-300">
        Load more reviews
      </button>
    </div>
  );
}

function ReviewCard({ name, date, text,rating }: { name: string; date: string; text: string,rating:number }) {
  const totalStar = 5
  return (
    <div className="flex gap-4 pb-4">
      <div className="w-12 h-12 bg-indigo-50 text-blue-500 rounded-full flex items-center justify-center font-medium">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center pb-3">
          <p className="font-medium text-gray-900 text-sm">{name}</p>
           <div className="flex items-center gap-0.5 text-gray-600">
            {[...Array(totalStar)].map((_, i) =>
              i < rating ? (
                <FaStar key={i} size={14} />
              ) : (
                <FaRegStar key={i} size={14} className="text-gray-300" />
              )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="mt-1 text-gray-600 text-sm">{text}</p>
          <p className="uppercase text-xs text-gray-500 font-medium">{date}</p>
        </div>
      </div>
    </div>
  );
}

