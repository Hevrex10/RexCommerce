import { useState } from "react";
import InputCard from "../component/InputCard";
import PagesCard from "./PagesCard";
import { Sizes, Color } from "./Card";
import SizeComponent from "./SizeComponent";
import ColorComponent from "./ColorComponent";

export default function AddProduct() {
  return (
    <PagesCard text="Add Product">
      <form className="gap-15 flex">
        <div className="flex w-full max-w-80 flex-col gap-5">
          <InputCard text="Title" name="title" />
          <InputCard text="Price" name="price" />
          <InputCard text="Categories" name="categories" />
          <InputCard text="Slug" name="slug" />
          <InputCard text="SKU" name="sku" />
          <label className="font-['Inter'] text-sm font-medium leading-6 text-zinc-600">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Product description"
            rows={5}
            className="w-full rounded-md px-5 py-2 font-['Inter'] text-sm font-medium text-gray-500 outline outline-gray-200"
          ></textarea>
        </div>
        <div className="flex w-full max-w-80 flex-col gap-5">
          <InputCard text="Stock Status" name="status" />
          <InputCard text="Available quality" name="qualitiy" />
          <InputCard text="Images" name="image" type="file" accept="image/*" />

          <div className="flex flex-col items-start justify-center gap-2.5">
            <ColorComponent />

            <SizeComponent />
          </div>
        </div>
      </form>
    </PagesCard>
  );
}
