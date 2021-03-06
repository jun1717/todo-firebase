import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Login from './login/'
import Navbar from './navbar/'
import Dashboard from './dashboard/'
import TodoComponent from './todos/'
import NoMatch from './NoMatch'

const App = () => (
  <BrowserRouter>
    <div>
      <CssBaseline />
      <Login />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/users/:uid/todos" component={TodoComponent} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App