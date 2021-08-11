import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SneakersInfo } from "../helper/interfaces"

interface SneakersFavouriteState {
  sneakersFavourites: SneakersInfo[],
}

const initialState: SneakersFavouriteState = {
  sneakersFavourites: [],
}

export const sneakersFavouriteSlice = createSlice({
  name: 'sneakers-favourite',
  initialState,
  reducers: {
    makeSneakersFavourite: (state, action: PayloadAction<SneakersInfo>) => {
      state.sneakersFavourites.push(action.payload)
    },
    removeSneakersFavourite: (state, action: PayloadAction<SneakersInfo>) => {
      let index = state.sneakersFavourites.findIndex(item => item.id === action.payload.id)
      state.sneakersFavourites.splice(index, 1)
    }
  },
})

export const { makeSneakersFavourite, removeSneakersFavourite } = sneakersFavouriteSlice.actions

export const sneakersFavouriteReducer = sneakersFavouriteSlice.reducer