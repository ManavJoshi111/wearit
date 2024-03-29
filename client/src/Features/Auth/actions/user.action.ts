import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../../../utlils/callApi";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: object, { rejectWithValue }) => {
    try {
      const res = await callApi("/api/auth/register", "POST", data);
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: object, { rejectWithValue }) => {
    try {
      const res = await callApi("/api/auth/login", "POST", data);
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await callApi("/api/auth/get-user", "POST");
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);
