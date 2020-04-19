import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import Face from '@material-ui/icons/Face'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import LockRoundedIcon from '@material-ui/icons/LockRounded'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

const Login = () => {
  const [data, setData] = useState({ username: '', password: '', showPassword: false }, { error: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/api')
      .then(resp => setData(resp.data))
  }
  
  const handleChange = (prop) => (event) => {
    console.log(prop)
    console.log(event.target.value)
    setData({ ...data, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setData({ ...data, showPassword: !data.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  // styling - move to scss?
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1)
    }
  }))

  const classes = useStyles()

  return <>
    <div className="section">
      <h1>Login</h1>
      <form onSubmit={() => handleSubmit(event)}>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item>
              <Input
                name='username'
                type='text'
                onChange={handleChange('username')}
                placeholder='username'
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <LockRoundedIcon />
            </Grid>
            <Grid item>
              <Input
                name='password'
                type={data.showPassword ? 'text' : 'password'}
                onChange={handleChange('password')}
                placeholder="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {data.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </div>
        <div className="button">
          <Button
            type='submit'
            onClick={() => handleSubmit(event)}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  </>
}

export default Login