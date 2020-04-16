import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Register from './User/Register'
import Login from './User/Login'

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route path={'/register'} component={Register} />
      <Route path={'/login'} component={Register} />
    </Switch>
  </BrowserRouter>
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)