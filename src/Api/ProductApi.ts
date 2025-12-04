import { supabase } from "../supabaseCl";
import { handleUXError } from "./ApiError";

export async function fetchProducts() {
  const { data: products, error } = await supabase.from("ProductList").select("*");

  if (error) {
    handleUXError(error);
    return [];
  }

  const productsImages = products.map((product) => {
    const { data: imageData } = supabase.storage.from("Images").getPublicUrl(product.image);

    return {
      ...product,
      image: imageData.publicUrl,
    };
  });

  return productsImages;
}

export async function fetchCart() {
  const { data, error } = await supabase.from("Cart").select("*");

  if (error) {
    handleUXError(error);
  }

  return data;
}

export async function fetchOrderList() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error getting user:", userError);
    return [];
  }
  if (!user) return [];

  const { data, error } = await supabase
    .from("Orders")
    .select("orderitems")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    handleUXError(error);
    return [];
  }

  return data;
}

export async function fetchAllOrders() {
  const { data, error } = await supabase
    .from("Orders")
    .select("orderitems")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data;
}

export async function fetchAllCustomers() {
  const { data, error } = await supabase.from("Orders").select("*");

  if (error) {
    console.error("Error fetching customers:", error);
    return [];
  }

  return data;
}
