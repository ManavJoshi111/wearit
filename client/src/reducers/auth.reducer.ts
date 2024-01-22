import { createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  loginUser,
  registerUser,
} from "../Auth/actions/user.action";

interface UserState {
  user?: Object;
  error?: String;
  loading?: Boolean;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = undefined;
        state.user = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = undefined;
        state.error = action.payload as string; // ?
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = undefined;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = undefined;
        state.error = action.payload as string; // ?
      });
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = undefined;
        state.user = action.payload.user;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = undefined;
        state.error = action.payload as string; // ?
      });
  },
});

export default userSlice;
