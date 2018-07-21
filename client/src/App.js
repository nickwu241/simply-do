import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AppProvider, Layout, Page } from '@shopify/polaris'
import Navbar from './components/Navbar'
import List from './components/List'
import store from './store'

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <Provider store={store}>
          <Switch>
            <Redirect exact from="/" to="/list/default" />
            <Route
              path="/list/:id"
              render={() => (
                <Page singleColumn>
                  <Layout>
                    <Navbar />
                    <List />
                  </Layout>
                </Page>
              )}
            />
          </Switch>
        </Provider>
      </AppProvider>
    )
  }
}
