import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { SneakersInfo } from '../helper/interfaces'
import { AppThunk } from './store'

interface SneakersState {
  loading: string,
  sneakers: SneakersInfo[],
  error: string
}

const initialState: SneakersState = {
  loading: 'off',
  sneakers: [],
  error: ''
}

export const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {
    getSneakersRequest: (state) => {
      state.loading = 'on'
    },
    getSneakersSuccess: (state, action: PayloadAction<SneakersInfo[]>) => {
      state.sneakers = action.payload
      state.loading = 'off'
    },
    getSneakersFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = 'off'
    },
    addToFavourite: (state, action: PayloadAction<SneakersInfo>) => {
      let obj = state.sneakers.findIndex(item => item.id === action.payload.id)
      state.sneakers[obj].isFavourite = true
    },
    removeFromFavourite: (state, action: PayloadAction<SneakersInfo>) => {
      let obj = state.sneakers.findIndex(item => item.id === action.payload.id)
      state.sneakers[obj].isFavourite = false
    },
    addToBucket: (state, action: PayloadAction<SneakersInfo>) => {
      let obj = state.sneakers.findIndex(item => item.id === action.payload.id)
      state.sneakers[obj].isInBucket = true
    },
    removeFromBucket: (state, action: PayloadAction<SneakersInfo>) => {
      let obj = state.sneakers.findIndex(item => item.id === action.payload.id)
      state.sneakers[obj].isInBucket = false
    }
  },
})

export const { getSneakersRequest, getSneakersSuccess, getSneakersFailure, addToFavourite, removeFromFavourite, addToBucket, removeFromBucket } = sneakersSlice.actions

export const getSneakers = (): AppThunk => {
  return async (dispatch) => {
    dispatch(getSneakersRequest())
    try {
      const res = await axios.get('https://60fe7f7e257411001707861e.mockapi.io/items')
      const sneakers = await res.data
      dispatch(getSneakersSuccess(sneakers))
    } catch (e) {
      dispatch(getSneakersFailure(e.message))
    }
  }
}

export const sneakersReducer = sneakersSlice.reducer