export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

// NOTE: the code below has been changed from the course code to fix an issue
// with type coercion of strings to numbers.
// Our addDecimals function expects a number and returns a string, so it is not
// correct to call it passing a string as the argument.

export const updateCart = (state) => {
    // Calculate the items price in whole number (pennies) to avoid issues with
    // floating point number calculations
    // calculate items price
    const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + (item.price * 100 * item.qty) / 100,
        0,
    );
    state.itemsPrice = addDecimals(itemsPrice);
    // calculate shipping price(if order > ₹3000 then free, else ₹100 shipping )
    const shippingPrice = itemsPrice > 3000 ? 0 : 100;
    state.shippingPrice = addDecimals(shippingPrice);
    // Calculate the tax price | Tax is 15% of the items price
    const taxPrice = 0.15 * itemsPrice;
    state.taxPrice = addDecimals(taxPrice);
    // Calculate the total price | Total price is the sum of the items price, shipping price and tax price
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    state.totalPrice = addDecimals(totalPrice);
    // Save the cart to localStorage
    localStorage.setItem("cart", JSON.stringify(state));
    return state;
};
