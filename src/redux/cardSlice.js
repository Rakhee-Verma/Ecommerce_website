import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MOCK_BASE_URL}/cartProducts`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    AddtoCart: (state, action) => {
      const item = state.cart.find((p) => p.id === action.payload.id);
      if (item) {
        item.count += 1;
      } else {
        state.cart.push({ ...action.payload, count: 1 });
      }
    },
    increse: (state, action) => {
      const item = state.cart.find((p) => p.id === action.payload);
      if (item) item.count += 1;
    },
    decrese: (state, action) => {
      const item = state.cart.find((p) => p.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
      } else if (item) {
        state.cart = state.cart.filter((p) => p.id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.map((item)=>({...item,count:item.count||1}));
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { AddtoCart, increse, decrese } = cartSlice.actions;
export default cartSlice.reducer;
