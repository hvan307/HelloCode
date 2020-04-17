import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import EmailRounded from '@material-ui/icons/EmailRounded'
import Face from '@material-ui/icons/Face'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import LockRoundedIcon from '@material-ui/icons/LockRounded'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

const Register = () => {
  const [data, setData] = useState({ email: '', username: '', password: '', passwordConfirmation: '', showPassword: false, showPasswordConfirmation: false })

  useEffect(() => {
    axios.post('/api/codedb')
      .then(resp => setData(resp.data))
  }, [])

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setData({ ...data, showPassword: !data.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1)
    }
  }))

  const classes = useStyles()

  return <>
    <div className="section">
      <h1>Register</h1>
      <form
        onSubmit={(event) => useEffect(event)}>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <EmailRounded />
            </Grid>
            <Grid item>
              <Input placeholder="E-mail" />
            </Grid>
          </Grid>
        </div>

        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item>
              <Input placeholder="Username" />
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
                type={data.showPassword ? 'text' : 'password'}
                value={data.password}
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
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <LockRoundedIcon />
            </Grid>
            <Grid item>
              <Input
                type={data.showPasswordConfirmation ? 'text' : 'passwordConfimation'}
                value={data.passwordConfirmation}
                onChange={handleChange('passwordConfirmation')}
                placeholder="Password Confirmation"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {data.showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </div>
        <div className="button">
          <Button variant="contained" color="primary">
            Register
          </Button>
        </div>
      </form>
    </div>
  </>
}

export default Register