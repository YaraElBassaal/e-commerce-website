import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      if (state.products.find((item) => item.id === action.payload.id)) {
        return alert("Product already in cart");
      }else{
        state.products.push(action.payload)
      }
    },
    increaseQuantity: (state, action) => {
        state.products = state.products.map((product) => {
            if (product.id === action.payload.id) {
                return { ...product, quantity: product.quantity + 1};
            }
            return product;
        })
    },
    decreaseQuantity: (state, action) => {
        state.products = state.products.map((product) => {
            if (product.id === action.payload.id) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        })
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { increaseQuantity, decreaseQuantity, addProductToCart, removeProduct } = cartSlice.actions

export default cartSlice.reducer