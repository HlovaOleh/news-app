import Header from '../../components/Header'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { LoginData } from '../../store/auth/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getLoginData, login } from '../../store/auth/slice'
import Loader from '../../components/Loader'

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const loginData = useAppSelector(getLoginData)
  const { control, handleSubmit } = useForm<LoginData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: loginData?.name,
      email: loginData?.email,
      apiKey: loginData?.apiKey,
    },
  })
  const isLoading = useAppSelector(state => state.auth.isLoading)

  const handleLogin = (loginData: LoginData) => {
    dispatch(login(loginData))
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 5 }}
        >
          <Typography variant="h5" component="h2">
            User Profile
          </Typography>
          <Box display="flex" flexDirection="column" rowGap={2}>
            <Controller
              name="name"
              control={control}
              rules={{ required: { value: true, message: 'Name is required' } }}
              render={({ field: { name, value, onChange }, fieldState: { error } }) => (
                <TextField
                  name={name}
                  label="Name"
                  placeholder="Enter a name"
                  variant="outlined"
                  error={!!error}
                  helperText={!!error && error.message}
                  onChange={event => onChange(event)}
                  value={value}
                  defaultValue={loginData?.name}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: { value: true, message: 'Email is required' } }}
              render={({ field: { name, value, onChange }, fieldState: { error } }) => (
                <TextField
                  name={name}
                  label="Email"
                  placeholder="Enter a email"
                  variant="outlined"
                  error={!!error}
                  helperText={!!error && error.message}
                  onChange={event => onChange(event)}
                  value={value}
                  defaultValue={loginData?.email}
                />
              )}
            />
            <Controller
              name="apiKey"
              control={control}
              rules={{ required: { value: true, message: 'API key is required' } }}
              render={({ field: { name, value, onChange }, fieldState: { error } }) => (
                <TextField
                  name={name}
                  label="API key"
                  placeholder="Enter a API key"
                  variant="outlined"
                  error={!!error}
                  helperText={!!error && error.message}
                  value={value}
                  defaultValue={loginData?.apiKey}
                  onChange={event => onChange(event)}
                />
              )}
            />
            <Button variant="contained" onClick={handleSubmit(handleLogin)}>
              Save Changes
            </Button>
          </Box>
        </Grid>
      )}
    </>
  )
}

export default ProfilePage
