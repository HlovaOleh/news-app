import { Auth } from '../../constants'
import { LoginData } from '../../store/auth/types'
import LOGIN_DATA = Auth.LOGIN_DATA

class AuthService {
  saveLoginData(loginData: LoginData) {
    localStorage.setItem(LOGIN_DATA, JSON.stringify(loginData))
  }

  getLoginData(): LoginData | null {
    return JSON.parse(localStorage.getItem(LOGIN_DATA) || 'null')
  }

  logOut() {
    localStorage.removeItem(LOGIN_DATA)
  }
}

const authService = new AuthService()

export default authService
