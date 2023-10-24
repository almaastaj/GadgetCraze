import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // The item to add to the cart
            const item = action.payload;
            // Check if the item is already in the cart
            const existItem = state.cartItems.find((x) => x._id === item._id);
            if (existItem) {
                // If exists, update quantity
                state.cartItems = state.cartItems.map((x) => (x._id === existItem._id ? item : x));
            } else {
                // If not exists, add new item to cartItems
                state.cartItems = [...state.cartItems, item];
            }
            // Update the prices and save to storage
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            // Filter out the item to remove from the cart
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            // Update the prices and save to storage
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            // Add shippingAddress coming from payload
            state.shippingAddress = action.payload;
            //Doubt? - Update the shipping address in Cart
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            // Add paymentMethod coming from payload
            state.paymentMethod = action.payload;
            // Update the paymentMethod in Cart
            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            // Clear the cart Items and update it in Cart
            state.cartItems = [];
            return updateCart(state);
        },
    },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
