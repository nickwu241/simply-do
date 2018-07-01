import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Navbar from './components/Navbar'
import List from './components/List'
import store from './store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <List />
        </div>
      </Provider>
    )
  }
}
