import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../utlils/axios";

export const registerUser = createAsyncThunk("user/registerUser", async () => {
  const res = await post("/api/auth/register");
  return res;
});

export const getUserData = createAsyncThunk("user/getUserData", async () => {
  try {
    const res = await post("/api/auth/get-user", {
      token: localStorage.getItem("token"),
    });
    return res;
  } catch (err: any) {
    console.log("error in getuser: ", err);
    throw err;
  }
});
