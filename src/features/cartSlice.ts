import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string | number;
  price: number;
  name: string;
  image: string;
  quantity: number;
  totalPrice: number;
  itemColor: string;
  itemSize: string;
  user_id?: string;
}

interface CartState {
  cartItems: CartItem[];
  subTotal: number;
  tax: number;
  total: number;
}

const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");

const initialState: CartState = {
  cartItems: storedCart.cartItems || [],
  subTotal: storedCart.subTotal || 0,
  tax: storedCart.tax || 0,
  total: storedCart.total || 0,
};

const saveCartToLocalStorage = (state: CartState) => {
  localStorage.setItem(
    "cart",
    JSON.stringify({
      cartItems: state.cartItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
    })
  );
};

const TAX_RATE = 0.05;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
        existingItem.itemColor = action.payload.itemColor;
        existingItem.itemSize = action.payload.itemSize;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        existingItem.user_id = action.payload.user_id ;
      } else {
        state.cartItems.push({
          ...action.payload,
          totalPrice: action.payload.price * action.payload.quantity,
        });
      }

      state.subTotal = state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      state.tax = Number((state.subTotal * TAX_RATE).toFixed(2));
      state.total = Number((state.subTotal + state.tax).toFixed(2));

      saveCartToLocalStorage(state);
    },

    removeFromCart(state, action: PayloadAction<number | string>) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);

      state.subTotal = state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      state.tax = Number((state.subTotal * TAX_RATE).toFixed(2));
      state.total = Number((state.subTotal + state.tax).toFixed(2));

      saveCartToLocalStorage(state);
    },

    clearCart(state) {
      state.cartItems = [];
      state.subTotal = 0;
      state.tax = 0;
      state.total = 0;
      localStorage.removeItem("cart");
    },

    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;

        state.subTotal = state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
        state.tax = Number((state.subTotal * TAX_RATE).toFixed(2));
        state.total = Number((state.subTotal + state.tax).toFixed(2));

        saveCartToLocalStorage(state);
      }
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;

        state.subTotal = state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
        state.tax = Number((state.subTotal * TAX_RATE).toFixed(2));
        state.total = Number((state.subTotal + state.tax).toFixed(2));

        saveCartToLocalStorage(state);
      }
    },

    setItemColor(state, action: PayloadAction<string>) {
      const color = state.cartItems.find((item) => item.itemColor === action.payload);
      if (color) {
        color.itemColor = action.payload;
      }
    },

    setSize(state, action: PayloadAction<string>) {
      const size = state.cartItems.find((item) => item.itemSize === action.payload);
      if (size) {
        size.itemSize = action.payload;
      }
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;

      // Recalculate totals
      state.subTotal = state.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      state.tax = Number((state.subTotal * TAX_RATE).toFixed(2));
      state.total = Number((state.subTotal + state.tax).toFixed(2));

      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  setItemColor,
  setSize,
  setCart
} = cartSlice.actions;

export default cartSlice.reducer;
