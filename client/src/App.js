import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { withCookies } from 'react-cookie';
import { Layout, Page } from '@shopify/polaris'
import Navbar from './components/Navbar'
import List from './components/List'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { listId: this.props.cookies.get('lastListId') || 'default' }
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

export default withCookies(App)