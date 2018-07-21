import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Layout } from '@shopify/polaris'
import ListItem from './ListItem'
import { getListItems, createEmptyListItem } from '../actions/listActions'

class List extends Component {
  state = {
    itemAdded: false
  }

  componentWillMount() {
    this.props.getListItems(this.props.listId)
    this.lastId = this.props.listId
  }

  componentWillReceiveProps(nextProps) {
    this.renderNewList(nextProps.listId)
  }

  renderNewList = newlistId => {
    if (this.lastId !== newlistId) {
      this.lastId = newlistId;
      this.setState({ itemAdded: false });
      this.props.getListItems(newlistId);
    }
  }

  addNewItem = () => {
    this.props.createEmptyListItem(this.props.listId)
    this.setState({ itemAdded: true })
  }

  render() {
    return (
      <Layout.Section>
        {this.props.items.map(item => (
          <ListItem key={item._id} listId={this.props.listId} item={item} autoFocus={this.state.itemAdded} />
        ))}
        <Button icon="add" onClick={this.addNewItem}>Add Reminder</Button>
      </Layout.Section>
    )
  }
}

const mapStateToProps = state => ({
  listId: state.list.id,
  items: state.list.items
})

export default connect(
  mapStateToProps,
  { getListItems, createEmptyListItem }
)(List)
