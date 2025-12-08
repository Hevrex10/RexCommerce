import React, { useState } from "react";
import InputBox from "./InputBox";
import StarRating from "./StarRating";
import { supabase } from "../supabaseCl";
import { v4 as uuid } from "uuid";

export default function ReviewForm({ product }: any) {
  const [rating, setRating] = useState<number>(0);
  console.log(product.reviews);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

      const form = e.currentTarget; 
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get("email") as string;
    const fullName = formdata.get("fullname") as string;
    const review = formdata.get("review") as string;

    const newReview = {
      id: uuid(),
      comment: review,
      date: new Date().toISOString(),
      rating,
      user: fullName,
    };

    const updatedReviews = [...(product.reviews || []), newReview];

    const { data, error } = await supabase
      .from("ProductList")
      .update({ reviews: updatedReviews })
      .eq("id", product.id)
      .select();

    if (error) {
      alert("Error saving review:" + error);
      return;
    }

    alert("Review saved successfully:" + data);
   form.reset();
    setRating(0);
  }

  return (
    <div className="relative min-h-[648px] w-full max-w-md rounded-lg bg-white outline outline-neutral-100">
      <div className="flex w-full items-center justify-between border-b border-b-gray-200 p-8">
        <p className="font-['Inter'] text-base font-semibold text-gray-900">Write Review</p>

        <p>jddj</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-9">
        <InputBox text="Email" name="email" required={true} />
        <InputBox text="Full Name" name="fullname" required={true} />

        <p>Review</p>
        <textarea
          name="review"
          className="h-32 w-full rounded-md px-5 py-2 font-['Inter'] text-sm font-medium text-gray-500 outline outline-gray-200"
        ></textarea>

        <div>
          <p className="mb-2 font-medium text-gray-700">Rating</p>
          <StarRating rating={rating} setRating={setRating} />
        </div>

        <button
          type="submit"
          className="flex w-72 items-center justify-center gap-1.5 rounded bg-gray-900 px-6 py-3 hover:cursor-pointer"
        >
          <p className="font-['Inter'] text-sm font-medium leading-6 text-white">
            Submit your review
          </p>
        </button>
      </form>
    </div>
  );
}
