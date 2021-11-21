import { createSlice } from '@reduxjs/toolkit'


const initialState = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const {payload} = action;
            const {cartProduct} = payload;

            // first we check if the product is already in the cart
            const isItemInCart = state.find(item => item.id === cartProduct.id);

            // if it exists in the cart, then we update the product
            if(isItemInCart) {
                return state.map(item => item.id === cartProduct.id ? {...item, ...cartProduct} : item)
            } else { // else we add it to the cart
                return [...state, { ...cartProduct }]
            }
        },
        deleteFromCart: (state, action) => {
            const {payload} = action;
            return state.filter(item => item.id !== payload.id)
        },
        reset: () => initialState
    }
})

export const { addToCart, deleteFromCart, reset } = cartSlice.actions;

export const selectCartLength = state => state.cart.length;
export const selectCart = state => state.cart;
export const selectTotalAmount = state => state.cart.reduce((acc, item) => acc + item.quantityPrice, 0);

export default cartSlice.reducer;
