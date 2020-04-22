import React from 'react'
import WebSocketInstance from '../../websocket'
import auth from '../../lib/auth'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
// import AccountCircleIcon from '@material-ui/icons/Icons/AccountCircleRounded'
import Avatar from '@material-ui/core/Avatar'



class Chat extends React.Component {

  initialiseChat() {
    //starts websocket connection and gets the chat id from the url in order to connect to the right chat
    //the chat id will come from the list of chats that is received from an API call
    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
      WebSocketInstance.fetchMessages(
        this.props.userChoice,
        this.props.chatChoice
      )
    })
    WebSocketInstance.connect(this.props.chatChoice)
    //the 1 in connect(1) is the chatId for the backend. 
    //this will be changed to be the chatId of the chat the user clicked on
    //and the chat list will have been gotten from an api call
    //which returns the full list of chats that the user is a part of
  }

  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.userChoice,
      currentChat: this.props.chatChoice
    }
    this.initialiseChat()
  }

  waitForSocketConnection(callback) {
    const component = this
    setTimeout(
      function () {
        if (WebSocketInstance.state() === 1) {
          console.log('connection is secure')
          //if the connection is ready and there are callback functions to do then start on the callback functions
          callback()
          return
        } else {
          console.log('waiting for connection...')
          component.waitForSocketConnection(callback)
        }
      }, 100)
  }

  setMessages(messages) {
    console.log('STATE Before setState', this.state)
    this.setState({ messages: this.state.oldMessages })
    this.setState({
      messages: messages.reverse()
    })
    console.log('MESSAGES After setState', this.state.messages)
  }

  renderMessages = (messages) => {
    return messages.map(message => (
      <div key={message.id} className={"messages" + (this.state.currentUser === message.author ? '-owner' : '')}>
        <div className="message-flex">
          <Avatar src={`http://localhost:4000${message.author.image}`} /> 
          <div className="message-content">{message.content}</div>
        </div>
      </div>
    ))
  }

  addMessage(message) {
    this.setState({ messages: this.state.oldMessages })

    this.setState({
      messages: [...this.state.messages, message]
    })
  }

  messageChangeHandler(event) {
    this.setState({
      message: event.target.value
    })
  }

  sendMessageHandler(e) {
    e.preventDefault()
    const messageObject = {
      from: this.state.currentUser, //this will be changed to be the user from the current token
      content: this.state.message,
      chatId: this.state.currentChat //this will also be changed to match the current chatid see at top for more info / ask ben
    }
    WebSocketInstance.newChatMessage(messageObject)
    this.setState({
      message: ''
    })
    this.setState({ oldMessages: this.state.messages })
    // setTimeout(() => {
    //   this.setState({ messages: WebSocketInstance.fetchMessages(this.state.currentUser, this.state.currentChat) })
    // }, 50)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    this.initialiseChat()
  }

  render() {

    const { messages, currentChat, currentUser, closeHandler } = this.state

    return <>
      <h3>Chatroom: {currentChat}, User: {currentUser}</h3>
      <div className="chat">
        {messages && this.renderMessages(messages)}
      </div>
      <div className="chat-input">
        <input
          type="text"
          onChange={(event) => this.messageChangeHandler(event)}
          value={this.state.message}
        />
        <Button
          onClick={(e) => this.sendMessageHandler(e)}
          variant="contained"
          color="primary"
          className="button"
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </div>
    </>
  }
}

export default Chat