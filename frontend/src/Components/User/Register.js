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
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button'

let selectedLangs = []

const Register = () => {
  const [data, setData] = useState({ email: '', username: '', password: '', passConfirm: '', showPassword: false, showPassConfirm: false })
  const [langData, setLangData] = useState({ languagesDb: [], userLanguages: [] })

  useEffect(() => {
    axios.get('/api/languages')
      .then(resp => setData({ languagesDb: resp.data }))
    // axios.post('/api')
    //   .then(resp => setData(resp.data))
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/api')
      .then(resp => setData(resp.data))
  }

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setData({ ...data, showPassword: !data.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleClickShowPassConfirm = () => {
    setData({ ...data, showPassConfirm: !data.showPassConfirm })
  }

  const handleSelectLang = (event) => {
    console.log(langData.userLanguages)
    // if (langData.userLanguages.includes(event.target.innerHTML)) {
    //   event.target.classList.remove('lang-selected')
    //   const filteredLangs = selectedLangs.filter((selectedLang) => {
    //     return selectedLang !== event.target.innerHTML
    //   })
    //   selectedLangs = filteredLangs
    //   setLangData({ ...langData, userLanguages: selectedLangs })
    // } else {
    event.target.classList.add('lang-selected')
    selectedLangs.push(event.target.innerHTML)
    setLangData({ ...langData, userLanguages: selectedLangs })
    // }

  }

  // const handleMouseDownPassConfirm = (event) => {
  //   event.preventDefault()
  // }

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
                value='data.email'
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
                type={data.showPassConfirm ? 'text' : 'password'}
                value={data.passConfirm}
                onChange={handleChange('passConfirm')}
                placeholder="Confirm password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle passConfirm visibility"
                      onClick={handleClickShowPassConfirm}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {data.showPassConfirm ? <Visibility /> : <VisibilityOff />}
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
                placeholder="Your timezone (GMT)" />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <ComputerRoundedIcon />
          <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            {data.languagesDb.map((language, id) => {
              return <Button
                key={id}
                onClick={() => handleSelectLang(event)}
                value={language.name}
              >
                {language.name}
              </Button>
            }
            )}
          </ButtonGroup>
          <FormHelperText id="component-helper-text">{`You code in ${selectedLangs}`}</FormHelperText>

        </div>
        <Input
          accept="image/*"
          className={classes.margin}
          type="file"
          startIcon={<CloudUploadIcon />}
        />
        {/* <Button
          accept="image/*"
          startIcon={<CloudUploadIcon />}
          type="file"
        >
          Upload Photo
        </Button> */}
        <div className="button-register">
          <Button
            onClick={() => handleSubmit(event)}
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  </>
}

export default Register