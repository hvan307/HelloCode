import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const MyChats = () => {

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

  return <div>
    <h1>My Chats</h1>
    <h2>These are all of your HelloCode chats</h2>
  </div>
}

export default MyChats