import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
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
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded'

let selectedLangs = []
let displayLangs = []

const Register = (props) => {

  const [data, setData] = useState({ email: '', username: '', password: '', password_confirmation: '', timezone: '', languages: [], image: '' })
  // , error: '' 
  const [password, setPassword] = useState({ showPassword: false, showPassConfirm: false })
  const [langData, setLangData] = useState({ languagesDb: [] })

  useEffect(() => {
    console.log('hello')
    axios.get('/api/languages/')
      .then(resp => setLangData({ languagesDb: resp.data }))
    // .catch(err => setData({ error: err.response.data }))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const imageInput = document.querySelector('.input-image')
    const image = imageInput.files
    const form = new FormData()
    form.append('username', data.username)
    form.append('email', data.email)
    form.append('password', data.password)
    form.append('password_confirmation', data.password_confirmation)
    form.append('timezone', data.timezone)
    data.languages.forEach(language => {
      form.append('languages', language)
    })
    form.append('image', image[0], image[0].name)
    axios.post('/api/auth/register/', form)
      .then(resp => {
        setData({ data: resp.data })
        props.history.push('/login')

      })
    // .catch(err => setData({ error: err.response.data }))
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
    // This checks the array of selected langs and filters out the duplicates
    if (selectedLangs.includes(parseInt(event.target.value))) {
      event.target.classList.remove('lang-selected')
      const filteredLangs = selectedLangs.filter((selectedLang) => {
        return selectedLang !== parseInt(event.target.value)
      })
      const filterDisplayLangs = displayLangs.filter((displayLang) => {
        return displayLang !== event.target.innerHTML
      })
      displayLangs = filterDisplayLangs
      selectedLangs = filteredLangs
      setData({ ...data, languages: selectedLangs })
    } else {
      event.target.classList.add('lang-selected')
      selectedLangs.push(parseInt(event.target.value))
      displayLangs.push(event.target.innerHTML)
      setData({ ...data, languages: selectedLangs })
    }
  }

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

  const inputEl = useRef(null)

  const onButtonClick = () => {
    inputEl.current.click()
  }

  return <>
    <div className='section register'>
      <h2>Register</h2>
      <form
        className='classes.form'
        onSubmit={() => handleSubmit(event)}
        encType='multipart/form-data'
      >
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
              <Face />
            </Grid>
            <Grid item>
              <Input
                className={classes.inputField}
                type='text'
                value={data.username}
                onChange={handleChange('username')}
                placeholder='Username' />
            </Grid>
          </Grid>
          {data.error && <FormHelperText error>
            {data.error.username[0]}
          </FormHelperText>}
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
              <EmailRounded />
            </Grid>
            <Grid item>
              <Input
                className={classes.inputField}
                type='text'
                value={data.email}
                onChange={handleChange('email')}
                placeholder='E-mail'
              />
            </Grid>
          </Grid>
          {data.error && <FormHelperText error>
            {data.error.email}
          </FormHelperText>}
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
              <LockRoundedIcon />
            </Grid>
            <Grid item>
              <Input
                className='classes.input'
                type={password.showPassword ? 'text' : 'password'}
                value={password.password}
                onChange={handleChange('password')}
                placeholder='Password'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
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
          {data.error && <FormHelperText error>
            {data.error.password[0]}
          </FormHelperText>}
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
              <LockRoundedIcon />
            </Grid>
            <Grid item>
              <Input
                type={password.showPassConfirm ? 'text' : 'password'}
                value={data.password_confirmation}
                onChange={handleChange('password_confirmation')}
                placeholder='Confirm password'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle passConfirm visibility'
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
          {data.error && <FormHelperText error>
            {data.error.password_confirmation[0]}
          </FormHelperText>}
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
              <LanguageRoundedIcon />
            </Grid>
            <Grid item>
              <Input
                className={classes.inputField}
                type='text'
                value={data.timezone}
                onChange={handleChange('timezone')}
                placeholder='Your timezone (GMT)' />
            </Grid>
          </Grid>
          {data.error && <FormHelperText error>
            {data.error.timezone[0]}
          </FormHelperText>}
        </div>
        <div className={classes.margin}>
          <div className="flex-button">
            <ComputerRoundedIcon />
            <ButtonGroup
              className='buttons-languages'
              variant='text'
              color='primary'
              aria-label='text primary button group'
            >
              {langData.languagesDb.map((language, id) => {
                return <button
                  className='language'
                  key={id}
                  onClick={(event) => handleSelectLang(event)}
                  value={language.id}
                >
                  {language.name}
                </button>
              }
              )}
            </ButtonGroup>
          </div>
        </div>
        <div className='classes.inputField'>
          <label htmlFor="input-image" className="input-form-icon"><PhotoLibraryRoundedIcon /></label>
          <input
            ref={inputEl}
            accept='image/png, image/jpeg'
            className='input-image'
            type='file'
          />
          <button
            className='input-image-button'
            type='button'
            onClick={onButtonClick}>
            Upload photo
          </button>
        </div>

        <div className='button-register'>
          <button
            type='submit'
            className='register'
            variant='contained'
            color='primary'
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </>
}
export default withRouter(Register)





