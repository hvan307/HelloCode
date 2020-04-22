import React from 'react'
import WebSocketInstance from '../../websocket'
import auth from '../../lib/auth'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
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
      currentChat: this.props.chatChoice,
      userOwner: [],
      userRecipient: []
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

  renderTimestamp = timestamp => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    )
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "just now..."
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`
    } else {
      prefix = `${new Date(timestamp)}`
    }
    return prefix
  }

  renderMessages = (messages) => {
    return messages.map(message => (  
      <div key={message.id} className={"messages" + (this.state.currentUser === message.author ? '-owner' : '')}>
        {console.log(message.timestamp)}
        <div className="message-flex">
          <Avatar src={this.state.currentUser === message.author ? this.state.userOwner.image : this.state.userRecipient.image}/> 
          <div className="message-content">{message.content} <br />
            <small>{this.renderTimestamp(message.timestamp)}</small>
          </div>
        </div>
      </div>
    ))
  }

  addMessage(message) {
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
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" })
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    this.initialiseChat()
  }

  componentDidMount(){
    const chatBar = document.getElementById('chat-input-bar')
    chatBar.focus()
    this.scrollToBottom()
    axios.get(`/api/user/username/${auth.getUserName()}`)
      .then(resp => this.setState({ userOwner: resp.data }))
    axios.get(`/api/user/username/${this.props.participant}`)
      .then(resp => {
        this.setState({ userRecipient: resp.data })
        console.log(resp.data)
      })
      .catch(err => console.log(err)) 
  }

  componentDidUpdate(){ 
    this.scrollToBottom()
  }
  
  render() {

    const { messages, currentChat, currentUser, closeHandler } = this.state

    return <>
      <h3>Chatroom: {currentChat}, User: {currentUser}</h3>
      <div className="chat">
        {messages && this.renderMessages(messages)}
      </div>
      <form 
        onSubmit={(e) => this.sendMessageHandler(e)}
        ref={el => this.messagesEnd = el}
      >
        <div className="chat-input">
          <input
            type="text"
            id="chat-input-bar"
            onChange={(event) => this.messageChangeHandler(event)}
            value={this.state.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="button"
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </div>
      </form>
    </>
  }
}

export default Chat