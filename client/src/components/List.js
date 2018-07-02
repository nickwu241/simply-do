import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import { getListItems, createEmptyListItem } from '../actions/listActions'

class List extends Component {
  componentWillMount() {
    this.props.getListItems(this.props.listId)
    this.lastId = this.props.listId
  }

  componentWillReceiveProps(nextProps) {
    if (this.lastId !== nextProps.listId) {
      this.lastId = nextProps.listId
      this.props.getListItems(nextProps.listId)
    }
  }

  addNewItem = () => this.props.createEmptyListItem(this.props.listId)

  render() {
    return (
      <div>
        <h3>Reminders</h3>
        <div id="listWithHandle">
          {this.props.items.map(item => (
            <ListItem key={item._id} listId={this.props.listId} item={item} />
          ))}
        </div>
        <input type="button" value="Add a reminder" onClick={this.addNewItem} />
      </div>
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
