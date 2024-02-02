import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../../../utlils/callApi";

export const getCartData: any = createAsyncThunk(
  "cart/getCartData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await callApi("/api/cart/get-cart", "GET");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);
