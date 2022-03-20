import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Grid, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import Header from '../../components/Header'
import { FetchTopHeadlinesRequest } from '../../services/news/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchTopHeadlines } from '../../store/news/slice'
import { Article } from '../../shared/types'
import ArticleView from '../../components/Article'
import Loader from '../../components/Loader'

const MainPage = () => {
  const [request, setRequest] = useState<FetchTopHeadlinesRequest>({
    searchParams: {
      q: '',
      language: 'en',
    },
  })
  const dispatch = useAppDispatch()
  const articles: Article[] | undefined = useAppSelector(state => state.news.articles)
  const isLoading = useAppSelector(state => state.news.isLoading)
  const error = useAppSelector(state => state.news.error)

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRequest(prevState => {
      return {
        ...prevState,
        searchParams: {
          ...prevState.searchParams,
          q: event.target.value,
        },
      }
    })
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => dispatch(fetchTopHeadlines(request)), 500)
    return () => clearTimeout(timeOutId)
  }, [request.searchParams.q])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <>
      <Header />
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <TextField
          name="searchValue"
          placeholder="Enter a value to search"
          variant="outlined"
          margin="normal"
          value={request.searchParams.q}
          onChange={event => handleOnChange(event)}
        />
      </Grid>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container alignItems="stretch" wrap="wrap" spacing={8}>
          {articles?.map((value, index) => {
            return (
              <Fragment key={index}>
                <ArticleView
                  source={value.source}
                  author={value.author}
                  title={value.title}
                  description={value.description}
                  url={value.url}
                  urlToImage={value.urlToImage}
                  publishedAt={value.publishedAt}
                  content={value.content}
                />
              </Fragment>
            )
          })}
        </Grid>
      )}
    </>
  )
}

export default MainPage
