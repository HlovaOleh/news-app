export interface InitialState {
  isLoading: boolean
  error?: string
}

export interface Article {
  source: ArticleSource
  author?: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export interface ArticleSource {
  id?: string
  name: string
}
