import axios from 'axios'
import { SearchParams } from './types'
import { authService } from '../index'

class HttpClient {
  private instance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })

    this.instance.interceptors.request.use(config => {
      const loginData = authService.getLoginData()
      config.headers!.Authorization = loginData?.apiKey || ''
      return config
    })
  }

  get(url: string, params: SearchParams) {
    return this.instance.get(url, {
      params,
    })
  }
}

const httpClient = new HttpClient(import.meta.env.VITE_API_BASE_URL)

export default httpClient
