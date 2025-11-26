import { useSelector } from "react-redux";
import { supabase } from "../supabaseCl";
import { handleUXError } from "./ApiError";

export async function fetchProducts() {
  const { data, error } = await supabase.from("ProductList").select("*");

  if (error) {
    handleUXError(error);
  }

  return data;
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

