import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Email from '@material-ui/icons/Email'
import Face from '@material-ui/icons/Face'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

const Register = () => {
  const [data, setData] = useState({ email: '', username: '', password: '', passwordConfirmation: '', showPassword: false })

  useEffect(() => {
    axios.post('/api/codedb',
      data)
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
              <Email />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="E-mail" />
            </Grid>
          </Grid>
        </div>

        <div className={classes.margin}>
          {/* <InputLabel htmlFor="Username">Username</InputLabel> */}
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Username" />
            </Grid>
          </Grid>
        </div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            type={data.showPassword ? 'text' : 'password'}
            value={data.password}
            onChange={handleChange('password')}
            startAdornment={
              <InputAdornment position="start">
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
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="passwordConfirmation">Password Confirmation</InputLabel>
          <Input
            type={data.showPassword ? 'text' : 'password'}
            value={data.passwordConfirmation}
            onChange={handleChange('passwordConfirmation')}
            startAdornment={
              <InputAdornment position="start">
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
        </FormControl>
        <div className="button">
          <Button variant="contained" color="primary">
            {/* <Link to="/login"> */}
              Register
            {/* </Link> */}
          </Button>
        </div>
      </form>
    </div>

    {/* <FormControl className={classes.margin}>
      <InputLabel htmlFor="password">Email</InputLabel>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <Input
            type={data.showPassword ? 'text' : 'password'}
            value={data.password}
            onChange={handleChange('password')}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {data.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          /> */}
    {/* </Grid> */}
    {/* <Grid item>
          <TextField id="input-with-icon-grid" label="With a grid" />
        </Grid>
      </Grid>
    </FormControl> */}






  </>

}

export default Register