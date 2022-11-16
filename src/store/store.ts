import { combineReducers, configureStore } from "@reduxjs/toolkit";
import companyReducer from './reducers/company/companySlice';
import modalReducer from './reducers/modal/modalSlice';
import placeReducer from './reducers/place/placeSlice';
import prefsReducer from './reducers/prefs/prefsSlice';
import productReducer from './reducers/product/productSlice';
import rulesReducer from './reducers/rules/rulesSlice';
import tasksReducer from './reducers/task/taskSlice';

const rootReducer = combineReducers({
  companyReducer,
  productReducer,
  placeReducer,
  modalReducer,
  prefsReducer,
  rulesReducer,
  tasksReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
