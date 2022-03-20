import { AuthState, LoginData } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../index'
import { authService } from '../../services'
import { fetchTopHeadlines } from '../news/slice'

const initialState: AuthState = {
  isLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true
    },
    loginSuccess(state, action: PayloadAction<LoginData>) {
      state.isLoading = false
      state.loginData = action.payload
    },
    logoutSuccess(state) {
      state.loginData = null
    },
  },
})

const { loginRequest, loginSuccess, logoutSuccess } = authSlice.actions

export const login =
  (loginData: LoginData): AppThunk =>
  dispatch => {
    dispatch(loginRequest())
    setTimeout(() => {
      authService.saveLoginData(loginData)
      dispatch(loginSuccess(loginData))
    }, 1000)
  }

export const logout = (): AppThunk => {
  return dispatch => {
    authService.logOut()
    dispatch(logoutSuccess())
  }
}

export const getLoginData = (state: RootState) => {
  if (state.auth.loginData) return state.auth.loginData

  return authService.getLoginData()
}

export default authSlice.reducer
