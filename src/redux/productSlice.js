import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Fetch all products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);
// 🔹 Create slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    filterProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    filterProductBySearch: (state, action) => {
      const searchItem = action.payload.toLowerCase();
      state.filterProducts = state.product.filter(
        (item) =>
          item.title.toLowerCase().includes(searchItem) ||
          item.description.toLowerCase().includes(searchItem) ||
          item.price.toString().includes(searchItem)
      );
    },

     filterProductByCategory: (state, action) => {
      const category = action.payload;
      if (category === "All") {
        state.filterProducts = state.product;
      } else {
        state.filterProducts = state.product.filter(
          (p) => p.category === category
        );
      }
    },

    // ✅ New reducer: select a single product
    selectedItem: (state, action) => {
      const itemId = action.payload;
      state.selectedItem = state.product.find((p) => p.id === itemId) || null;
    },


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.filterProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
  },
});

export const { filterProductBySearch, filterProductByCategory, selectedItem} = productSlice.actions;

export default productSlice.reducer;
