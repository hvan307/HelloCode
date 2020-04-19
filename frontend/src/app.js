import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styling/style.scss'
import NavbarDrawer from './Components/Common/NavbarDrawer'
import Register from './Components/User/Register'
import Login from './Components/User/Login'
import PreChat from './Common/PreChat'

const App = () => {
  return <BrowserRouter>
    <NavbarDrawer />
    <Switch>
      <Route path={'/register'} component={Register} />
      <Route path={'/login'} component={Login} />
      {/* <Route path={'/myprofile'} component={MyProfile} /> */}
      <Route path={'/mychats'} component={PreChat} />
    </Switch>
    <PreChat />
  </BrowserRouter>
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)