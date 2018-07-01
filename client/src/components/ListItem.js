import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateListItem, deleteListItem } from '../actions/listActions'

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      item: this.props.item
    }
    this.updateMap = {}
  }

  updateDebounced = item => {
    const newItem = {
      ...this.state.item,
      ...item
    }
    this.setState({ item: newItem })

    clearTimeout(this.updateMap[newItem._id])
    this.updateMap[newItem._id] = setTimeout(() => {
      this.props.updateListItem(this.props.listId, newItem)
      delete this.updateMap[newItem._id]
    }, 1000)
  }

  deleteItemIfEmpty = item => {
    console.log('deleteItemIfEmpty', item)
    if (item.text === '') {
      this.deleteItem(item)
    }
  }

  deleteItem = item => {
    this.props.deleteListItem(this.props.listId, item._id)
  }

  render() {
    return (
      <div className="list-group-item">
        <div className="pretty p-default p-thick p-round">
          <input
            type="checkbox"
            checked={this.state.item.checked}
            onChange={e => this.updateDebounced({ checked: e.target.checked })}
          />
          <div className="state p-success">
            <label />
          </div>
        </div>
        <span className="glyphicon glyphicon-move" aria-hidden="true" />
        <input
          type="text"
          className="item-input"
          value={this.state.item.text}
          onChange={e => this.updateDebounced({ text: e.target.value })}
          onBlur={e => this.deleteItemIfEmpty(this.state.item)}
        />
        <button
          className="round-btn"
          onClick={e => this.deleteItem(this.state.item)}
        >
          X
        </button>
      </div>
    )
  }
}

export default connect(
  null,
  { updateListItem, deleteListItem }
)(ListItem)
