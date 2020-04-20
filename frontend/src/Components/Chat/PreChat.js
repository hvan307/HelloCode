import React from 'react'
import Chat from './Chat'

class PreChat extends React.Component {
  constructor() {
    super()
    this.state = {
      buttonPressed: false,
      userChoice: '',
      chatChoice: 0
    }
  }

  onPressBen() {
    this.setState({
      buttonPressed: true,
      userChoice: 'ben',
      chatChoice: 1
    })
  }

  onPressTom() {
    this.setState({
      buttonPressed: true,
      userChoice: 'tom',
      chatChoice: 1
    })
  }

  render() {
    console.log(this.state)
    return <div>
      {!this.state.buttonPressed &&
        <div>
          <button onClick={()=>this.onPressBen()}>ben</button>
          <button onClick={()=>this.onPressTom()}>tom</button>
        </div>}
      {this.state.buttonPressed &&
        <Chat
          userChoice={this.state.userChoice}
          chatChoice={this.state.chatChoice}
        />}
    </div>
  }
}

export default PreChat