import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox, TextField, Button } from '@shopify/polaris'
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

  deleteItemIfEmpty = () => {
    if (this.state.item.text === '') {
      this.deleteItem(this.state.item)
    }
  }

  deleteItem = () => {
    this.props.deleteListItem(this.props.listId, this.state.item._id)
  }

  render() {
    return (
      <div className={this.state.item.checked ? 'strike' : ''}>
        <TextField
          value={this.state.item.text}
          onChange={value => this.updateDebounced({ text: value })}
          onBlur={this.deleteItemIfEmpty}
          autoFocus={this.props.autoFocus}
          connectedLeft={
            <Checkbox
              checked={this.state.item.checked}
              onChange={value => this.updateDebounced({ checked: value })}
            />}
          connectedRight={
            <Button icon="cancel" onClick={this.deleteItem} />
          }
        />
      </div>
    )
  }
}

export default connect(
  null,
  { updateListItem, deleteListItem }
)(ListItem)
