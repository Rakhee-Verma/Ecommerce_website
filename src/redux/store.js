import { configureStore } from "@reduxjs/toolkit";
import productReducer from'./productSlice';
import cartReducer from './cardSlice';
export const store=configureStore({
    reducer:{
        product:productReducer,
        cart:cartReducer,
    }
})