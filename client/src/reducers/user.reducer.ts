import { createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  loginUser,
  registerUser,
} from "../Features/Auth/actions/user.action";
import removeUserToken from "../utlils/removeUserToken";

type UserState = {
  user?: Object;
  error?: String;
  loading?: Boolean;
};

const initialState: UserState = {
  user: undefined,
  error: undefined,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      removeUserToken();
      state.user = state.loading = state.error = undefined;
    },
  },
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

export const { logoutUser } = userSlice.actions;
export default userSlice;
