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
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded'
import ComputerRoundedIcon from '@material-ui/icons/ComputerRounded'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
// import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button'

let selectedLangs = []
let displayLangs = []

const Register = () => {
  const [data, setData] = useState({ email: '', username: '', password: '', password_confirmation: '', timezone: '', languages: [] })
  const [password, setPassword] = useState({ showPassword: false, showPassConfirm: false })
  const [langData, setLangData] = useState({ languagesDb: [] })

  useEffect(() => {
    axios.get('/api/languages/')
      .then(resp => setLangData({ languagesDb: resp.data }))
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/api/auth/register/', data)
      .then(resp => {
        console.log(resp.data)
        resp.data
      })
  }

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleClickShowPassConfirm = () => {
    setPassword({ ...password, showPassConfirm: !password.showPassConfirm })
  }

  const handleSelectLang = (event) => {
    event.preventDefault()
    console.log(data.languages)
    // if (data.languages.includes(event.target.innerHTML)) {
    //   event.target.classList.remove('lang-selected')
    //   const filteredLangs = selectedLangs.filter((selectedLang) => {
    //     return selectedLang !== event.target.innerHTML
    //   })
    //   selectedLangs = filteredLangs
    //   setLangData({ ...data, languages: selectedLangs })
    // } else {
    event.target.classList.add('lang-selected')
    console.log(event.target)
    selectedLangs.push(parseInt(event.target.value))
    displayLangs.push(event.target.innerHTML)
    setData({ ...data, languages: selectedLangs })
    // }
  }

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1)
    }
  }))

  const classes = useStyles()

  return <>
    <div className="section register">
      <h2>Register</h2>
      <form onSubmit={() => handleSubmit(event)}>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item>
              <Input
                type='text'
                value={data.username}
                onChange={handleChange('username')}
                placeholder="Username" />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <EmailRounded />
            </Grid>
            <Grid item>
              <Input
                type='text'
                value={data.email}
                onChange={handleChange('email')}
                placeholder='E-mail'
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
                type={password.showPassword ? 'text' : 'password'}
                value={password.password}
                onChange={handleChange('password')}
                placeholder="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {password.showPassword ? <Visibility /> : <VisibilityOff />}
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
                type={password.showPassConfirm ? 'text' : 'password'}
                value={data.password_confirmation}
                onChange={handleChange('password_confirmation')}
                placeholder="Confirm password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle passConfirm visibility"
                      onClick={handleClickShowPassConfirm}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {password.showPassConfirm ? <Visibility /> : <VisibilityOff />}
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
              <LanguageRoundedIcon />
            </Grid>
            <Grid item>
              <Input
                type='text'
                value={data.timezone}
                onChange={handleChange('timezone')}
                placeholder="Your timezone (GMT)" />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <ComputerRoundedIcon />
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
          >
            {langData.languagesDb.map((language, id) => {
              return <button
                className='language'
                key={id}
                value={language.id}
                onClick={() => handleSelectLang(event)}
              >
                {language.name}
              </button>
            }
            )}
          </ButtonGroup>
          <FormHelperText id="component-helper-text">{`You code in ${displayLangs}`}</FormHelperText>

        </div>
        {/* <Input
          accept="image/*"
          className={classes.margin}
          type="file"
          // value={data.image}
          // startIcon={<CloudUploadIcon />}
        /> */}
        <div className="button-register">
          <button
            type='submit'
            className='register'
            variant="contained"
            color="primary"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </>
}

export default Register