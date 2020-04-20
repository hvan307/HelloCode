import React from 'react'
import { useState, useEffect } from 'react'
import auth from '../../lib/auth'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';


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
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  contactUsername: {
    paddingLeft: '20px',
  },
}));


const MyChats = () => {
  const classes = useStyles();
  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     flexGrow: 1,
  //     overflow: 'hidden',
  //     padding: theme.spacing(0)
  //   },
  //   button: {
  //     margin: theme.spacing(1)
  //   }
  // }))



  const [user, setUser] = useState(auth.getUserName())
  const [chats, setChats] = useState([])

  useEffect(() => {
    axios.get(`api/chat/user/${user}/`)
      .then(res => {
        setChats(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  console.log(chats)
  return <div className={classes.root}>
    <List className={classes.root}>
      {chats.map(chat => {
        console.log(`User ${user} chatId ${chat.id}`)
        return <Link key={chat.id} to={{
          pathname: '/chat',
          state: {
            currentUser: user,
            currentChat: chat.id
          }
        }}>
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
        </Link>
      })}
    </List>
  </div >
  // return <div>
  //   {chats.map(chat => {
  //     return <p key={chat.id}>
  //       {chat.participants.map((user, key) => {
  //         return <p key={key}>{user.username}</p>
  //       })}
  //     </p>
  //   })}
  // </div>
}

export default withRouter(MyChats)