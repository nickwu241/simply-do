import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Form, FormLayout, Layout, TextField, Heading } from '@shopify/polaris'
import uuid from 'uuid'
import { setListId } from '../actions/listActions'

class Navbar extends Component {
  constructor(props) {
    super(props)
    const listId = props.match.params.id
    this.props.setListId(listId)
    this.state = {
      listIdDisplay: listId === 'default' ? '' : listId,
      listId
    }
  }

  handleSubmit = () => {
    const listId = this.state.listIdDisplay || 'default'
    if (listId === this.listIdDisplay) {
      return
    }
    this.setState({ listId })
    this.props.setListId(listId)
    this.props.history.replace(`/list/${listId}`, 'refresh')
  }

  generateRandomId = () => this.setState({ listIdDisplay: uuid() })

  render() {
    return (
      <Layout.Section>
        <Heading>{'Current List ID: ' + this.state.listId}</Heading>
        <Form onSubmit={this.handleSubmit}>
          <FormLayout>
            <TextField
              placeholder="default"
              value={this.state.listIdDisplay}
              onChange={(value) => this.setState({ listIdDisplay: value })}
              connectedRight={<Button submit primary>Go</Button>}
            />
          </FormLayout>
          <Button slim onClick={this.generateRandomId}>Generate Random ID</Button>
        </Form>
      </Layout.Section>
    )
  }
}

const mapStateToProps = state => ({
  listId: state.list.id
})

export default withRouter(
  connect(
    mapStateToProps,
    { setListId }
  )(Navbar)
)
