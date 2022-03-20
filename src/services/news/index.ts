import httpClient from '../http-client'
import { FetchTopHeadlinesRequest } from './types'
import { API } from '../../constants'

class NewsService {
  async fetchTopHeadlines(request: FetchTopHeadlinesRequest) {
    return await httpClient.get(API.TOP_HEADLINES_ENDPOINT, request.searchParams)
  }
}

const newsService = new NewsService()

export default newsService
