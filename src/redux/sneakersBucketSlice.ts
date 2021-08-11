import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SneakersInfo } from "../helper/interfaces"

interface SneakersBucketState {
  sneakersBucket: SneakersInfo[],
}

const initialState: SneakersBucketState = {
  sneakersBucket: [],
}

export const sneakersBucketSlice = createSlice({
  name: 'sneakers-bucket',
  initialState,
  reducers: {
    addSneakersToBucket: (state, action: PayloadAction<SneakersInfo>) => {
      state.sneakersBucket.push(action.payload)
    },
    removeSneakersFromBucket: (state, action: PayloadAction<SneakersInfo>) => {
      let index = state.sneakersBucket.findIndex(item => item.id === action.payload.id)
      state.sneakersBucket.splice(index, 1)
    }
  },
})

export const { addSneakersToBucket, removeSneakersFromBucket } = sneakersBucketSlice.actions

export const sneakersBucketReducer = sneakersBucketSlice.reducer