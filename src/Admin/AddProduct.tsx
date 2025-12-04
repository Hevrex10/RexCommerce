import { useState } from "react";
import InputCard from "../component/InputCard";
import PagesCard from "./PagesCard";
import SizeComponent from "./SizeComponent";
import ColorComponent from "./ColorComponent";
import { supabase } from "../supabaseCl";

export default function AddProduct() {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const name = formdata.get("name") as string;
    const price = formdata.get("price") as string;
    const detail = formdata.get("details") as string;
    const category = formdata.get("category") as string;
    const description = formdata.get("description") as string;
    const status = formdata.get("status") as string;
    const quality = (formdata.get("quality") as string).split(",").map((tag) => tag.trim());

    let imageUrl = null;
    if (selectImage) {
      const productImage = selectImage.name;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("Images")
        .upload(productImage, selectImage);

      if (uploadError) {
        console.error(uploadError);
        return;
      }

      imageUrl = productImage;
    }

    const { data, error } = await supabase
      .from("ProductList")
      .insert([
        {
          name,
          price,
          image: imageUrl,
          description,
          detail,
          category,
          colors: selectedColors,
          tags: quality,
          sizes: selectedSize,
          instock: status === "TRUE" || "true" ? true : false,
          created_at: new Date().toISOString(),
          updatedat: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Insert error:", error);
      return;
    }
    alert("succesful");
  }

  return (
    <PagesCard text="Add Product">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-50">
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-12">
          <div className="flex w-full max-w-80 flex-col gap-5">
            <InputCard text="Name" name="name" />
            <InputCard text="Price" name="price" />
            <InputCard text="Details" name="details" />
            <InputCard text="Categories" name="category" />
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
            <InputCard text="Stock Status" name="status" placeholder="TRUE OR FALSE" />
            <InputCard text="Available quality" name="quality" />
            <InputCard
              text="Images"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e: any) => {
                const file = e.target.files?.[0] || null;
                setSelectImage(file);
                if (file) {
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Selected preview"
                className="h-15 w-15 rounded-md object-cover"
              />
            )}

            <div className="flex flex-col items-start justify-center gap-2.5">
              <ColorComponent
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
              />

              <SizeComponent selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex w-[170px] items-center justify-center rounded bg-gray-900 p-2 outline-1 outline-gray-300 hover:cursor-pointer"
        >
          <p className="text-white">Save Product</p>
        </button>
      </form>
    </PagesCard>
  );
}
