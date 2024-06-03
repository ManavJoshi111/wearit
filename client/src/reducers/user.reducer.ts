import {ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  loginUser,
  registerUser,
} from "../Features/Auth/actions/user.action";
import removeUserToken from "../utlils/removeUserToken";
import UserType from "../types/user.types";

type UserState = {
  user?: UserType;
  error?: string;
  loading?: boolean;
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
    logoutUser: (state: UserState) => {
      removeUserToken();
      state.user = state.loading = state.error = undefined;
    },
  },
  extraReducers: (builder:ActionReducerMapBuilder<UserState>) => {
    builder
      .addCase(registerUser.pending, (state:UserState) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state:UserState, action:PayloadAction<any>) => {
        state.loading = undefined;
        state.user = action.payload.data;
      })
      .addCase(registerUser.rejected, (state:UserState, action) => {
        state.loading = undefined;
        state.error = action.payload as string; // ?
      });
    builder
      .addCase(loginUser.pending, (state:UserState) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state:UserState, action) => {
        state.loading = undefined;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state:UserState, action) => {
        state.loading = undefined;
        state.error = action.payload as string; // ?
      });
    builder
      .addCase(getUserData.pending, (state:UserState) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUserData.fulfilled, (state:UserState, action) => {
        state.loading = undefined;
        state.user = action.payload.user;
      })
      .addCase(getUserData.rejected, (state:UserState, action) => {
        state.loading = undefined;
        state.error = action.payload as string; // ?
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice;
