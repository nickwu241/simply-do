import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import List from './components/List'
import store from './store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Redirect exact from="/" to="/list/default" />
          <Route
            path="/list/:id"
            render={() => (
              <div>
                <Navbar />
                <List />
              </div>
            )}
          />
        </Switch>
      </Provider>
    )
  }
}
