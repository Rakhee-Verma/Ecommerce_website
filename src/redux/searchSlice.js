import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  formTable: [],
  filterDetails: [],
};

const searchSlice = createSlice({
  name: "formTable",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.formTable = action.payload;
      state.filterDetails = action.payload;
    },
    searchUserDetails: (state, action) => {
      const searchValue = action.payload.toLowerCase();
      state.filterDetails = state.formTable.filter(
        (item) =>
          item.username?.toLowerCase().includes(searchValue) ||
          item.email?.toLowerCase().includes(searchValue) ||
          item.id?.toString().includes(searchValue) ||
          item.password?.toString().includes(searchValue)
      );
    },
  },
});

export const { setUserDetails, searchUserDetails } = searchSlice.actions;
export default searchSlice.reducer;

