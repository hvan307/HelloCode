import React from 'react'
import WebSocketInstance from '../../websocket'

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
    console.log(messages)
    this.setState({
      messages: messages.reverse()
    })
  }

  renderMessages = (messages) => {
    console.log(messages)
    return messages.map(message => (
      <p key={message.id}>
        <p>{message.content}  <br />User: {message.author}</p>
      </p>
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
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({
      message: ''
    })
    setTimeout(() => {
      this.setState({ messages: WebSocketInstance.fetchMessages(this.state.currentUser, this.state.currentChat) })
    }, 50)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    this.initialiseChat()
  }

  render() {
    const {messages, currentChat, currentUser} = this.state
    console.log(messages)
    return <>
      <h1>Messages, Chatroom: {currentChat}, User: {currentUser}</h1>
      {messages &&
        this.renderMessages(messages)
      }
      <input
        type="text"
        onChange={(event) => this.messageChangeHandler(event)}
        value={this.state.message}
      />
      <button onClick={(e) => this.sendMessageHandler(e)}>Submit</button>
    </>
  }
}

export default Chat