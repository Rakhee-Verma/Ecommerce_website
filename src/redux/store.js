import { configureStore } from "@reduxjs/toolkit";
import productReducer from'./productSlice';
import cartReducer from './cardSlice';
import searchReducer from './searchSlice';
export const store=configureStore({
    reducer:{
        product:productReducer,
        cart:cartReducer,
        //  search: searchReducer,
         formTable: searchReducer,
    }
})