import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  FetchTopHeadlinesRequest,
  FetchTopHeadlinesResponse,
  NewsState,
} from '../../services/news/types'
import { AppThunk } from '../index'
import { newsService } from '../../services'

const initialState: Partial<NewsState> = {
  articles: [],
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchTopHeadlinesRequest(state) {
      state.isLoading = true
    },
    fetchTopHeadlinesSuccess(state, action: PayloadAction<FetchTopHeadlinesResponse>) {
      state.isLoading = false
      state.articles = action.payload.articles
    },
    fetchTopHeadlinesFailed(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

const { fetchTopHeadlinesRequest, fetchTopHeadlinesSuccess, fetchTopHeadlinesFailed } =
  newsSlice.actions

export const fetchTopHeadlines = (request: FetchTopHeadlinesRequest): AppThunk => {
  return async dispatch => {
    dispatch(fetchTopHeadlinesRequest())

    try {
      const { data } = await newsService.fetchTopHeadlines(request)

      dispatch(fetchTopHeadlinesSuccess(data))
    } catch (e) {
      dispatch(fetchTopHeadlinesFailed((<Error>e).message))
    }
  }
}

export default newsSlice.reducer
