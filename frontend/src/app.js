import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './styling/style.scss'
import NavbarDrawer from './Components/Common/NavbarDrawer'
import Register from './Components/User/Register'
import Login from './Components/User/Login'
import Chat from './Components/Chat/Chat'
import PreChat from './Components/Chat/PreChat'
import Home from './Components/Common/Home'
import MyProfile from './Components/User/MyProfile'
import NewChat from './Components/User/NewChat'
import MyChats from './Components/User/MyChats'

import './styling/style.scss'

const App = () => {
  return <HashRouter>
    <NavbarDrawer />
    <Switch>
      <Route path={'/register'} component={Register} />
      <Route path={'/login'} component={Login} />
      <Route path={'/myprofile'} component={MyProfile} />
      <Route path={'/newchat'} component={NewChat} />
      <Route path={'/mychats'} component={MyChats} />
      <Route path={'/chat'} component={Chat} />
      <Route path={'/'} component={Home} />
    </Switch>
    <PreChat />
  </HashRouter>
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)