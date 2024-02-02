import { createSlice } from "@reduxjs/toolkit";
import ProductType from "../types/product.types";
import { getProducts } from "../Features/Common/actions/product.action";

type ProductState = {
  products?: ProductType[];
  error?: string;
  loading?: boolean;
};

const initialState: ProductState = {
  products: undefined,
  error: undefined,
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products?.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products?.filter(
        (product: ProductType) => product?._id !== action.payload
      );
    },
    editProduct: (state, action) => {
      // state.products = [...state.products, action.payload];
      state.products = state.products?.map((product: ProductType) => {
        console.log("action: ", action.payload);
        return product?._id === action.payload._id ? action.payload : product;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = undefined;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = undefined;
        state.error = action.payload as string; // ?
      });
  },
});

export const { addProduct, deleteProduct, editProduct } = productSlice.actions;
export default productSlice;
