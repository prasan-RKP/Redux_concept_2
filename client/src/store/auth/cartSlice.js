import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addCart } from "./authThunk.js";

const initialState = {
    carts : [],
    cartLoading: false,
    cartError: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,

    extraReducers: (builder) => {
        builder
        // fetch cart Logic
        .addCase(fetchCart.pending, (state) => {
            state.cartLoading = true;
            state.cartError = null
        })

        .addCase(fetchCart.fulfilled, (state, action) => {
            state.cartLoading = false;
            state.carts = action.payload;
            state.cartError = null;
        })
         
        .addCase(fetchCart.rejected, (state, action) => {
            state.cartLoading = false,
            state.cartError = action.payload
        })

        // Add to cart logic
        .addCase(addCart.pending, (state)=>{
            state.cartLoading = true;
            state.cartError = null
        })

        .addCase(addCart.fulfilled, (state, action) => {
            state.cartLoading = false,
            state.cartError = null,
            state.carts = action.payload;
        })

        .addCase(addCart.rejected, (state, action) => {
             state.cartError = action.payload;
             state.cartLoading = false
        })
    }
});

export default cartSlice.reducer;