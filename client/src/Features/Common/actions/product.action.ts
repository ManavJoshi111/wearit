import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../../utlils/callApi";

export const getProducts: any = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await callApi("/api/product/get-products", "GET");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);
