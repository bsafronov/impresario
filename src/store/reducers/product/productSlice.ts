import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IProduct, IProductCreateNew, IProducts, IProductSetStatus } from "./product.interface"

const initialState: IProducts = {
  totalCreated: 0,
  products: []
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    createProduct(state, action:PayloadAction<IProductCreateNew>) {
      const productData: IProduct = {
        id: state.totalCreated + 1,
        name: action.payload.name,
        companyId: action.payload.companyId,
        placeId: action.payload.placeId,
        area: action.payload.area,
        pending: 0,
        status: "await"
      }
      state.totalCreated += 1
      state.products = [...state.products, productData]
    },
    deleteProduct(state, action:PayloadAction<number>) {
      state.products = state.products.filter(product => product.id !== action.payload)
    },
    setProductStatus(state, action:PayloadAction<IProductSetStatus>) {
      state.products = state.products.map(product => {
        if (product.id === action.payload.id) {
          product.status = action.payload.status
        }
        return product
      })
    }
  }
})

export default productSlice.reducer;