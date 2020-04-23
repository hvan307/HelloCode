import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import auth from '../../lib/auth'

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
import { FormHelperText } from '@material-ui/core'

const Login = () => {
  const [form, setForm] = useState({ showPassword: false, error: '' })

  const handleChange = (prop) => (event) => {
    console.log(prop, 'handle change prop')
    setForm({ ...form, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setForm({ ...form, showPassword: !form.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/api/auth/login/',
      form)
      .then(resp => {
        const token = resp.data.token
        auth.setToken(token)
        history.push('/myprofile')   
      })
      .catch(err => setForm({ error: err.response.data.message }))
  }

  // Styling
  const inputWidth = 225

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1)
    },
    inputField: {
      width: inputWidth
    }
  }))

  const classes = useStyles()

  return <>
    <div className="section login">
      <h1>Login</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item>
              <Input
                className={classes.inputField}
                name='username'
                type='text'
                onChange={handleChange('form.data.username')}
                placeholder='username'
              />
            </Grid>
          </Grid>
          {form.error && <FormHelperText error>
            {form.error}
          </FormHelperText>}
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <LockRoundedIcon />
            </Grid>
            <Grid item>
              <Input
                name='password'
                type={form.showPassword ? 'text' : 'password'}
                onChange={handleChange('form.data.password')}
                placeholder="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {form.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
          {form.error && <FormHelperText error>
            {form.error}
          </FormHelperText>}
        </div>
        <div className="button">
          <Button
            type='submit'
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