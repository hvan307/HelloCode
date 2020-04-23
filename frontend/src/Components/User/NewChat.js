import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Axios from 'axios'
import auth from '../../lib/auth'
import { Avatar } from '@material-ui/core'

const NewChat = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper
    },
    avatar: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1)
      }
    },
    contactUsername: {
      paddingLeft: '20px'
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexWrap: 'wrap'
      // '& > *': {
      //   margin: theme.spacing(1)
      // }
    }
  }))


  const classes = useStyles()
  const [languages, setLanguages] = useState([])
  const [users, setUsers] = useState([])
  const [openChats, setOpenChats] = useState([])
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    Axios.get('/api/languages/')
      .then(res => setLanguages(res.data))
      .catch(err => console.log(err.response.data))
    Axios.get('/api/')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => console.log(err))
    Axios.get(`api/chat/user/${auth.getUserName()}/`)
      .then(res => {
        //this code gets a list of chats, get the participants of all the chats
        //removes the current user from all the participants then converts to set and back
        //to remove duplicates
        let array = []
        res.data.forEach(e => array.push(e.participants.filter(elem => {
          if (elem.username !== auth.getUserName()) return elem.username
        })))
        array = array.flat(Infinity)
        array = array.map(elem => elem.username)
        const uniqueSet = new Set(array)
        array = [...uniqueSet]
        setOpenChats(array)
      })
      .catch(err => console.log(err))
  }, [])

  const handleCreateChat = (event, id) => {
    const form = {
      'participants': [auth.getUserId(), id]
    }
    Axios.post('/api/chat/create/', form)
      .catch(error => console.log(error.response))
  }

  const handleFilter = (event, id) => {
    event.preventDefault()
    if (filter === id) return setFilter(null)
    setFilter(id)
  }

  const checkLang = (user) => {
    const userLang = user.languages.map(lang => {
      return lang.id
    })
    if (!filter) return true
    return (userLang.includes(filter) ? true : false) 
  }

  return (
    <div className={classes.main}>
      <h3>Want to get a private lesson in a language or library? Need help debugging a problem? Click on the corresponding button below to start a conversation with our experienced community members:</h3>
      <ButtonGroup className="button-group" variant="text" color="primary" aria-label="text primary button group">
        {languages.map(language => {
          return <Button
            key={language.id}
            onClick={(event) => handleFilter(event, language.id)}
            className={language.id === filter ? 'lang-selected' : ''}
          >
            {console.log(language.id, filter)}
            {language.name}
          </Button>
        })}
      </ButtonGroup>
      <List>
        {users.map(user => (
          !openChats.includes(user.username) && 
          user.username !== auth.getUserName() &&
          checkLang(user) &&
          <ListItem key={user.id} className={classes.root}>
            <Avatar className={classes.avatar} src={user.image}/>
            <ListItemText className={'list-item ' + classes.contactUsername}>
              <Link
                to={{
                  pathname: '/mychats',
                  state: {
                    openChat: true
                  }
                }}
                onClick={(event) => handleCreateChat(event, user.id)}
              >
                {user.username}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default NewChat