import { createSlice } from "@reduxjs/toolkit"

const initialState = ({
    cart: [],
})
 const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AddtoCart: (state, action) => {
            const item = state.cart.find((p) => p.id === action.payload.id)
            if (item) {
                item.count += 1
            } else {
                state.cart.push({ ...action.payload, count: 1 })
            }
        },
        increase: (state, action) => {
            const item = state.cart.find((p) => p.id === action.payload)
            if (item) item.count += 1
        },
        decrese: (state, action) => {
            const item = state.cart.find((p) => p.id === action.payload)
            if (item && item.count > 1) {
                item.count -= 1
            } else if (item) {
                state.cart = state.cart.filter(p => p.id !== action.payload);
            }
        }
    }
})
export const{AddtoCart,increase,decrese}=cartSlice.actions;
export default cartSlice.reducer;
