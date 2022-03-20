import { InitialState } from '../../shared/types'

export interface LoginData {
  name?: string
  email: string
  apiKey: string
}

export interface AuthState extends InitialState {
  loginData?: LoginData | null
}

export enum AuthActionTypes {
  LOGIN_START = 'LOGIN_START',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
}

export interface LoginStartAction {
  type: AuthActionTypes.LOGIN_START
}

export interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS
}

export interface LoginFailedAction {
  type: AuthActionTypes.LOGIN_FAILED
  error: string
}

export type AuthActions = LoginStartAction | LoginSuccessAction | LoginFailedAction
