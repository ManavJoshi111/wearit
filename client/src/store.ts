import { configureStore } from "@reduxjs/toolkit";
import { userSlice, productSlice, cartSlice } from "./reducers/index";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
