import { createSlice } from '@reduxjs/toolkit'
import data from '../data/products.ts'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data
  },
  reducers: {
  }
})

export const {  } = productsSlice.actions
export const selectProducts = state => state.products.data
export const selectProductsByCategory = (state, category) => state.products.data.filter(product => product.category === category)
export const selectProductsById = (state, id) => state.products.data.find(product => product.id === id)

export default productsSlice.reducer