import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from './auth/slice'
import newsReducer from './news/slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
