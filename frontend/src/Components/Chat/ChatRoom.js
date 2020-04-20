import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const ChatRoom = () => {

  const Messages = [
    {
      sender: 'Alex',
      text: 'Hi there!'
    },
    {
      sender: 'Dima',
      text: 'Whaddap?'
    },
    {
      sender: 'Alex',
      text: 'Nothun...'
    }
  ]

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0)
    },
    button: {
      margin: theme.spacing(1)
    }
  }))

  const classes = useStyles()

  return <div className={classes.root}>
    <Grid
      container spacing={1}
      direction="column"
      justify="space-between"
      alignItems="stretch"
    >
      <Grid item>
        {Messages.map((message, index) =>
          <div key={index}>
            <div>{message.sender}:</div>
            <div>{message.text}</div>
          </div>
        )}
      </Grid>
      <Grid item>
        <TextField id="stardard-basic" label="Message" />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  </div >
}

export default ChatRoom