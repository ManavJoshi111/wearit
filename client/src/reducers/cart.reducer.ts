import { createSlice } from "@reduxjs/toolkit";
import { getCartData } from "../Features/Buyer/cart/actions/cart.action";
import CartType from "../types/cart.types";

type CartState = {
  cart?: CartType;
  error?: string;
  loading?: boolean;
};

const initialState: CartState = {
  cart: undefined,
  error: undefined,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.loading = undefined;
        state.cart = action.payload.cart;
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.loading = undefined;
        state.error = action.payload as string; // ?
      });
  },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice;
