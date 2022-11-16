import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModals } from "./modal.interface";

const initialState: IModals = {
  managingCompanyId: null,
  managingProductId: null,
  isCreateCompany: false,
  isCreatePlace: false,
  isCreateProduct: false,
  isCompanyManager: false,
  isPlaceManager: false,
  isProductManager: false  
}

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setManagingCompanyId(state, action:PayloadAction<number | null>) {
      state.managingCompanyId = action.payload
    },
    setManagingProductId(state, action:PayloadAction<number | null>) {
      state.managingProductId = action.payload
    },
    setIsCreateCompany(state, action:PayloadAction<boolean>) {
      state.isCreateCompany = action.payload
    },
    setIsCreatePlace(state, action:PayloadAction<boolean>) {
      state.isCreatePlace = action.payload
    },
    setIsCreateProduct(state, action:PayloadAction<boolean>) {
      state.isCreateProduct = action.payload
    },
    setIsCompanyManager(state, action:PayloadAction<boolean>) {
      state.isCompanyManager = action.payload
    },
    setIsPlaceManager(state, action:PayloadAction<boolean>) {
      state.isPlaceManager = action.payload
    },
    setIsProductManager(state, action:PayloadAction<boolean>) {
      state.isProductManager = action.payload
    },
  }
})

export default modalSlice.reducer;