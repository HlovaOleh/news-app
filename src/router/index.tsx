import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from '../pages/login'
import { useAppSelector } from '../store/hooks'
import { getLoginData } from '../store/auth/slice'
import MainPage from '../pages/main'
import ProfilePage from '../pages/profile'

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <MainPage />
          </AuthRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  const loginData = useAppSelector(getLoginData)

  if (!loginData?.apiKey) {
    return <Navigate to="/login" state={{ from: location }} replace />
  } else {
    return children
  }
}

export default Router
