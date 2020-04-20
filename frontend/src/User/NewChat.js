import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'

const NewChat = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  }))

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h2>Having trouble with a language? No worries! We will match you with someone who can help!</h2>
      <h2>What language do you need help with?</h2>
      <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        <Button>HTML</Button>
        <Button>CSS</Button>
        <Button>JavaScript</Button>
        <Button>Python</Button>
        <Button>...</Button>
      </ButtonGroup>
    </div>
  )
}

export default NewChat