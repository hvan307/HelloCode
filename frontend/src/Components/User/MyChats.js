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
import { Divider } from '@material-ui/core'


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
    setTimeout(() => {
      axios.get(`api/chat/user/${user}/`)
        .then(res => {
          setChats(res.data)
          console.log(res.data)
        })
        .catch(err => console.log(err))
    }, 100)
  }, [])

  const openChatHandler = (event, chat) => {
    event.preventDefault()
    setOpenChat(true)
    setCurrentChat(chat)
  }

  const closeChatHandler = () => {
    setOpenChat(false)
    setCurrentChat(null)
  }

  const getParticipant = (participants) => {
    console.log(participants)
    let participantUserName
    participants.forEach(participant => {
      if (participant.username !== auth.getUserName()) participantUserName = participant.username
    })
    return participantUserName
  }


  return chats.length !== 0 && <div className={classes.root}>
    {!openChat && <List className={classes.root}>
      {chats.map(chat => {
        return <a key={chat.id}
          onClick={(event) => openChatHandler(event, chat)}
        >
          {chat.participants.map((participant, key) => {
            if (participant.username !== user) {
              return <>
                <ListItem>
                  <Avatar className={classes.avatar} src={participant.image} />
                  <ListItemText
                    key={key}
                    className={classes.contactUsername}
                  >
                    {participant.username}
                  </ListItemText>
                  <small>{(chat.messages.length !== 0) && chat.messages.reverse()[0].author.username + ': ' + chat.messages.reverse()[0].content}</small>
                </ListItem>
                <Divider />
              </>
            }
          })}
        </a>
      })}
    </List>}
    {openChat &&
      <div>
        <ArrowBackIcon
          className="arrow-back"
          onClick={() => closeChatHandler()}
        />
        <Chat chatChoice={currentChat.id} userChoice={user} participant={getParticipant(currentChat.participants)} />
      </div>
    }
  </div >
}

export default withRouter(MyChats)