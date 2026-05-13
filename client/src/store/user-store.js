import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice.js';
import cartReducer from './auth/cartSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    }
})