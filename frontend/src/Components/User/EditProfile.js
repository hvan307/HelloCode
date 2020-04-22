import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import auth from '../../lib/auth'

import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Face from '@material-ui/icons/Face'
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded'
import ComputerRoundedIcon from '@material-ui/icons/ComputerRounded'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded'

let selectedLangs = []
let displayLangs = []

const EditProfile = (props) => {

  const [data, setData] = useState({ image: '', username: '', timezone: '', languages: [] })
  const [langData, setLangData] = useState({ languagesDb: [] })

  const id = auth.getUserId()

  useEffect(() => {
    console.log('hello')
    axios.get('/api/languages/')
      .then(resp => setLangData({ languagesDb: resp.data }))
      // .catch(err => setData({ error: err.response.data }))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const imageInput = document.querySelector('.input-image')
    // console.log(imageInput)
    const image = imageInput.files
    const form = new FormData()
    form.append('image', image[0], image[0].name)
    form.append('username', data.username)
    form.append('timezone', data.timezone)
    form.append('languages', data.languages)

    axios.put(`/api/user/${id}/`, form)
      .then(resp => {
        setData({ data: resp.data })
        props.history.push('/myprofile')
      })
  }

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value })
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
      <h2>Edit Profile</h2>
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
              <LanguageRoundedIcon />
            </Grid>
            <Grid item>
              <Input
                className={classes.inputField}
                type='text'
                value={data.timezone}
                onChange={handleChange('timezone')}
                placeholder='Your timezone' />
            </Grid>
          </Grid>
          {data.error && <FormHelperText error>
            {data.error.timezone[0]}
          </FormHelperText>}
        </div>
        <div className={classes.margin}>
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
          <FormHelperText id='component-helper-text'>{`You code in ${displayLangs}`}</FormHelperText>
        </div>
        <div className='classes.inputField'>
          <label htmlFor="input-image" className="input-form-custom"><PhotoLibraryRoundedIcon /></label>
          <input
            ref={inputEl}
            accept='image/png, image/jpeg'
            className='input-image'
            type='file'
          />
          <button type='input-button' onClick={onButtonClick}>
            Upload
          </button>
        </div>
        <div className='button-register'>
          <button
            type='submit'
            className='register'
            variant='contained'
            color='primary'
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  </>

}

export default EditProfile