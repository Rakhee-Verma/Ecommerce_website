import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: (localStorage.getItem("accessToken")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("accessToken", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
