import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './styling/style.scss'
import NavbarDrawer from './Components/Common/NavbarDrawer'
import Register from './Components/User/Register'
import Login from './Components/User/Login'
import ChatRoom from './Common/ChatRoom'
import PreChat from './Common/PreChat'
import Home from './Common/Home'
import MyProfile from './User/MyProfile'
import NewChat from './User/NewChat'

const App = () => {
  return <HashRouter>
    <NavbarDrawer />
    <Switch>
      <Route path={'/register'} component={Register} />
      <Route path={'/login'} component={Login} />
      <Route path={'/myprofile'} component={MyProfile} />
      <Route path={'/newchat'} component={NewChat} />
      {/* <Route path={'/mychats'} component={MyChats} /> */}
      <Route path={'/chatroom'} component={ChatRoom} />
      <Route path={'/'} component={Home} />
    </Switch>
    <PreChat />
  </HashRouter>
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)