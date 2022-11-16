import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlace, IPlaceAllocate, IPlaceCreateNew, IPlaceOccupy, IPlaces } from "./place.interface";

const initialState: IPlaces = {
  totalCreated: 0,
  places: []
}

export const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addPlace(state, action:PayloadAction<IPlaceCreateNew>) {
      const placeData: IPlace = {
        id: state.totalCreated + 1,
        companyId: action.payload.companyId ?? null,
        name: action.payload.name,
        rank: action.payload.rank,
        freeSpace: action.payload.rank ** 2 
      }
      state.totalCreated += 1
      state.places = [...state.places, placeData]
    },
    deletePlace(state, action:PayloadAction<number>) {
      state.places = state.places.filter(place => place.id !== action.payload)
    },
    occupyPlace(state, action:PayloadAction<IPlaceOccupy>) {
      state.places = state.places.map(place => {
        if (place.id === action.payload.placeId) {
          place.companyId = action.payload.companyId
        }
        return place;
      })
    },
    giveSpaceToProduct(state, action:PayloadAction<IPlaceAllocate>) {
      state.places = state.places.map(place => {
        if (place.id === action.payload.placeId) {
          place.freeSpace -= action.payload.space
        }

        return place
      })
    }
  }
})

export default placeSlice.reducer;