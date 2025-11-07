import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cardSlice";
import searchReducer from "./searchSlice";
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    formTable: searchReducer,
    auth: authReducer,
  },
});
