import React from 'react'
import { useState, useEffect } from 'react'
import auth from '../../lib/auth'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import WorkIcon from '@material-ui/icons/Work'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import Chat from '../Chat/Chat'


const testLink = (username, chatId) => {
  return <Link
    to={{
      pathname: '/chat',
      state: {
        currentUser: username,
        currentChat: chatId
      }
    }} />
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  contactUsername: {
    paddingLeft: '20px'
  }
}))


const MyChats = () => {
  const classes = useStyles();

  const [user, setUser] = useState(auth.getUserName())
  const [chats, setChats] = useState([])
  const [openChat, setOpenChat] = useState(false)
  const [currentChat, setCurrentChat] = useState(null)

  useEffect(() => {
    axios.get(`api/chat/user/${user}/`)
      .then(res => {
        setChats(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const openChatHandler = (event, chatId) => {
    event.preventDefault()
    setOpenChat(true)
    setCurrentChat(chatId)
  }

  const closeChatHandler = () => {
    setOpenChat(false)
    setCurrentChat(null)
  }

  return <div className={classes.root}>
    {!openChat && <List className={classes.root}>
      {chats.map(chat => {
        console.log(`User ${user} chatId ${chat.id}`)
        return <a key={chat.id}
          onClick={(event) => openChatHandler(event, chat.id)}
        >
          <ListItem>
            <Avatar className={classes.avatar} />
            {chat.participants.map((participant, key) => {
              if (participant.username !== user) {
                return <ListItemText
                  key={key}
                  className={classes.contactUsername}
                >
                  {participant.username}
                </ListItemText>
              }
            })}
          </ListItem>
        </a>
      })}
    </List>}
    {openChat && 
    <div>
      <ArrowBackIcon
        className="arrow-back" 
        onClick={() => closeChatHandler()} 
      />
      <Chat chatChoice={currentChat} userChoice={user} />
    </div>
    }
  </div >
}

export default withRouter(MyChats)