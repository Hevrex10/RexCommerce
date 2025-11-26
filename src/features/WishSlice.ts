import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Wishlist from "../Acount/Wishlist";

interface WishlistItem {
  product_id: string | number;
  name: string;
  date?: string;
  price: number;
  image: string;
}

interface WishlistState {
  wishlist: WishlistItem[];
}

const savedWishlist = localStorage.getItem("wishlist");

const initialState: WishlistState = {
  wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
};

function saveToLocalStorage(wishlist: WishlistItem[]) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      const itemsExist = state.wishlist.find((item) => item.product_id === action.payload.product_id);
      if (!itemsExist) {
        state.wishlist.push(action.payload);
        saveToLocalStorage(state.wishlist);
      }
    },
    removeFromWishlist(state, action: PayloadAction<WishlistItem>) {
      state.wishlist = state.wishlist.filter((item) => item.product_id !== action.payload.product_id);
      saveToLocalStorage(state.wishlist);
    },
    clearWishList(state) {
      state.wishlist = [];
      saveToLocalStorage(state.wishlist);
    },
  },
});

export default wishSlice.reducer;
export const { addToWishlist, removeFromWishlist, clearWishList } = wishSlice.actions;
