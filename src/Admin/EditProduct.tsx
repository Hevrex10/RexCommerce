import { useLoaderData } from "react-router-dom";
import { supabase } from "../supabaseCl";
import { useState } from "react";

export default function EditProduct() {
  const product = useLoaderData() as any;

  const [form, setForm] = useState(product);
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(product.image ? product.image : null);

  async function handleSubmit() {
    let imageUrl = form.image;

    if (selectImage) {
      const fileName = `${Date.now()}-${selectImage.name}`;

      const { error: uploadError } = await supabase.storage
        .from("Images")
        .upload(fileName, selectImage);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return;
      }

      imageUrl = fileName;
    }

    const { error } = await supabase
      .from("ProductList")
      .update({
        name: form.name,
        price: form.price,
        instock: form.instock,
        category: form.category,
        image: imageUrl,
        updatedat: new Date().toISOString(),
      })
      .eq("id", product.id);

    if (error) {
      alert("Error updating product");
      return;
    }

    alert("Updated successfully");
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-xl font-bold">Edit Product</h1>

      <p>Edit name</p>
      <input
        className="mb-3 w-full border p-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <p>Edit Price</p>
      <input
        className="mb-3 w-full border p-2"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <label className="mb-1 block font-medium">Stock Status</label>
      <select
        className="mb-3 w-full border p-2"
        value={form.instock ? "true" : "false"}
        onChange={(e) => setForm({ ...form, instock: e.target.value === "true" })}
      >
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>

      <p>Edit category</p>
      <input
        className="mb-3 w-full border p-2"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <p>Edit Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setSelectImage(file);
          if (file) setPreviewUrl(URL.createObjectURL(file));
        }}
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          className="mt-3 h-24 w-24 rounded border object-cover"
        />
      )}

      <button onClick={handleSubmit} className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
        Save Changes
      </button>
    </div>
  );
}

export async function editLoader({ params }: any) {
  const { id } = params;

  const { data, error } = await supabase.from("ProductList").select("*").eq("id", id).single();

  if (error) throw error;

  return data;
}
