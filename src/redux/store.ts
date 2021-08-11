import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { sneakersBucketReducer } from './sneakersBucketSlice'
import { sneakersFavouriteReducer } from './sneakersFavouriteSlice'
import { sneakersReducer } from './sneakersSlice'

export const store = configureStore({
  reducer: {
    sneakers: sneakersReducer,
    favourite: sneakersFavouriteReducer,
    bucket: sneakersBucketReducer
  }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

// Typing hooks

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector