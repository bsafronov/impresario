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
  isProductManager: false,
  isOptionsManager: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setStateModals(state, action: PayloadAction<IModals | null>) {
      if (action.payload) {
        state.managingCompanyId = action.payload.managingCompanyId;
        state.managingProductId = action.payload.managingProductId;
        state.isCreateCompany = action.payload.isCreateCompany;
        state.isCreatePlace = action.payload.isCreatePlace;
        state.isCreateProduct = action.payload.isCreateProduct;
        state.isCompanyManager = action.payload.isCompanyManager;
        state.isPlaceManager = action.payload.isPlaceManager;
        state.isProductManager = action.payload.isProductManager;
        state.isOptionsManager = action.payload.isOptionsManager;
      } else {
        state.managingCompanyId = initialState.managingCompanyId;
        state.managingProductId = initialState.managingProductId;
        state.isCreateCompany = initialState.isCreateCompany;
        state.isCreatePlace = initialState.isCreatePlace;
        state.isCreateProduct = initialState.isCreateProduct;
        state.isCompanyManager = initialState.isCompanyManager;
        state.isPlaceManager = initialState.isPlaceManager;
        state.isProductManager = initialState.isProductManager;
        state.isOptionsManager = initialState.isOptionsManager;
      }
    },
    setManagingCompanyId(state, action: PayloadAction<number | null>) {
      state.managingCompanyId = action.payload;
    },
    setManagingProductId(state, action: PayloadAction<number | null>) {
      state.managingProductId = action.payload;
    },
    setIsCreateCompany(state, action: PayloadAction<boolean>) {
      state.isCreateCompany = action.payload;
    },
    setIsCreatePlace(state, action: PayloadAction<boolean>) {
      state.isCreatePlace = action.payload;
    },
    setIsCreateProduct(state, action: PayloadAction<boolean>) {
      state.isCreateProduct = action.payload;
    },
    setIsCompanyManager(state, action: PayloadAction<boolean>) {
      state.isCompanyManager = action.payload;
    },
    setIsPlaceManager(state, action: PayloadAction<boolean>) {
      state.isPlaceManager = action.payload;
    },
    setIsProductManager(state, action: PayloadAction<boolean>) {
      state.isProductManager = action.payload;
    },
    setIsOptionsManager(state, action: PayloadAction<boolean>) {
      state.isOptionsManager = action.payload;
    },
  },
});

export default modalSlice.reducer;
