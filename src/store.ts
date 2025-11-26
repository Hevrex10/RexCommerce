import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/uiSlice";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/AuthSlice";
import wishReducer from "./features/WishSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
