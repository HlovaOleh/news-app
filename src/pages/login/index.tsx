import { Box, Button, Grid, Link, TextField, Tooltip, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getLoginData, login } from '../../store/auth/slice'
import { LoginData } from '../../store/auth/types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const dispatch = useAppDispatch()
  const loginData = useAppSelector(getLoginData)
  const navigate = useNavigate()

  const handleLogin = (loginData: LoginData) => {
    dispatch(login(loginData))
  }

  useEffect(() => {
    if (loginData?.apiKey) {
      navigate('/')
    }
  }, [loginData])

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Box display="flex" flexDirection="column" rowGap={2}>
        <Controller
          name="email"
          control={control}
          rules={{ required: { value: true, message: 'Email is required' } }}
          render={({ field: { name, onChange }, fieldState: { error } }) => (
            <TextField
              name={name}
              label="Email"
              placeholder="Enter a email"
              variant="outlined"
              error={!!error}
              helperText={!!error && error.message}
              onChange={event => onChange(event)}
            />
          )}
        />
        <Controller
          name="apiKey"
          control={control}
          rules={{ required: { value: true, message: 'API key is required' } }}
          render={({ field: { name, onChange }, fieldState: { error } }) => (
            <TextField
              name={name}
              label="API key"
              placeholder="Enter a API key"
              variant="outlined"
              error={!!error}
              helperText={!!error && error.message}
              onChange={event => onChange(event)}
              InputProps={{
                endAdornment: (
                  <>
                    <Tooltip
                      title={
                        <>
                          <Typography paragraph={true}>
                            To get API key you need to register here -
                            <Link
                              href="https://newsapi.org/register"
                              target="_blank"
                              rel="noreferrer"
                            >
                              https://newsapi.org/register
                            </Link>
                          </Typography>
                        </>
                      }
                    >
                      <HelpOutlineIcon />
                    </Tooltip>
                  </>
                ),
              }}
            />
          )}
        />
        <Button variant="contained" onClick={handleSubmit(handleLogin)}>
          Log in
        </Button>
      </Box>
    </Grid>
  )
}

export default LoginPage
