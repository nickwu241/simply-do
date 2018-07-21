import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Layout, Spinner } from '@shopify/polaris'
import ListItem from './ListItem'
import { getListItems, createEmptyListItem } from '../actions/listActions'

class List extends Component {
  state = { enableAutoFocus: false }

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
      this.setState({ enableAutoFocus: false });
      this.props.getListItems(newlistId);
    }
  }

  addNewItem = () => {
    this.props.createEmptyListItem(this.props.listId)
    this.setState({ enableAutoFocus: true })
  }

  render() {
    const { listId, items, isFetching } = this.props
    const autoFocus = this.state.enableAutoFocus

    return (
      <Layout.Section>
        {!isFetching || <Spinner size="large" color="teal" accessibilityLabel="Loading" />}
        {isFetching || items.map(item =>
          <ListItem key={item._id} listId={listId} item={item} autoFocus={autoFocus} />
        )}
        {isFetching || <Button icon="add" onClick={this.addNewItem} > Add Reminder</Button>}
      </Layout.Section>
    )
  }
}

const mapStateToProps = state => ({
  listId: state.list.id,
  items: state.list.items,
  isFetching: state.list.isFetching
})

export default connect(
  mapStateToProps,
  { getListItems, createEmptyListItem }
)(List)
