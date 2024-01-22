import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../utlils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: Object, { rejectWithValue }) => {
    try {
      const res = await post("/api/auth/register", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: Object, { rejectWithValue }) => {
    try {
      const res = await post("/api/auth/login", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await post("/api/auth/get-user", {
        token: localStorage.getItem("token"),
      });
      console.log("result: ", res.data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);
