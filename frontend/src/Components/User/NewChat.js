import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Axios from 'axios'
import auth from '../../lib/auth'

const NewChat = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1)
      },
    },
    contactUsername: {
      paddingLeft: '20px',
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  }));


  const classes = useStyles()
  const [languages, setLanguages] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    Axios.get('/api/languages/')
      .then(res => setLanguages(res.data))
      .catch(err => console.log(err.response.data))
    Axios.get('/api')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => console.log(err))
    console.log(users)
  }, [])

  const handleCreateChat = (event, username) => {
    console.log(username)
    const form = {
      'user1': auth.getUserName(),
      'user2': username
    }
    Axios.post('/api/chat/create/', form)
  }

  return (
    <div className={classes.main}>
      <h2>Having trouble with a language? No worries! We will match you with someone who can help!</h2>
      <h2>What language do you need help with?</h2>
      <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        {languages.map(language => {
          return <Button key={language.id}>
            {language.name}
          </Button>
        })}
      </ButtonGroup>
      <List>
        {users.map(user => {
          return <ListItem key={user.id} className={classes.root}>
            <ListItemText>
              <Link
                to={{
                  pathname: '/mychats',
                  state: {
                    openChat: true
                  }
                }}
                onClick={(event) => handleCreateChat(event, user.username)}
              >
                {user.username}
              </Link>
            </ListItemText>
          </ListItem>
        })}
      </List>
    </div>
  )
}

export default NewChat