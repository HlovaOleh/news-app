import { SearchParams } from '../http-client/types'
import { Article, InitialState } from '../../shared/types'

export interface FetchTopHeadlinesRequest {
  searchParams: SearchParams
}

export interface FetchTopHeadlinesResponse {
  status: string
  totalResult: number
  articles: Article[]
}

export interface NewsState extends InitialState {
  articles: Article[]
}
