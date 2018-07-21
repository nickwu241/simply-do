import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Layout, Page } from '@shopify/polaris'
import Navbar from './components/Navbar'
import List from './components/List'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { listId: Cookies.get('lastListId') || 'default' }
  }

  render() {
    return (
      <Switch>
        <Redirect exact from="/" to={`/list/${this.state.listId}`} />
        <Route
          path="/list/:id"
          render={() => (
            <Page singleColumn>
              <Layout sectioned>
                <Navbar />
                <List />
              </Layout>
            </Page>
          )}
        />
      </Switch>
    )
  }
}