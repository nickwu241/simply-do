import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ListItem from './ListItem'
import { getListItems, createEmptyListItem } from '../actions/listActions'

class List extends Component {
  componentWillMount() {
    this.props.getListItems(this.props.listId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state === 'refresh') {
      this.props.location.state = {}
      this.props.getListItems(this.props.listId)
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

export default withRouter(
  connect(
    mapStateToProps,
    { getListItems, createEmptyListItem }
  )(List)
)
