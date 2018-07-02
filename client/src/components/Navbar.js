import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setListId } from '../actions/listActions'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.props.setListId(props.initialId)
    this.state = {
      listIdDisplay: props.initialId,
      listIdPending: props.initialId
    }
  }

  listIdInputOnChange = e => this.setState({ listIdPending: e.target.value })
  listIdInputValue = () =>
    this.state.listIdPending === 'default' ? '' : this.state.listIdPending

  go = () => {
    const listId = this.state.listIdPending || 'default'
    this.setState({ listIdDisplay: listId })
    this.props.setListId(listId)
  }

  generateRandomId = () => {
    console.log('generateRandomId')
  }

  copyToClipboard = () => {
    console.log('copyToClipboard')
  }

  showCopiedToClipboard = () => {
    console.log('showCopiedToClipboard')
  }

  render() {
    return (
      <div>
        <div>Current List: {this.state.listIdDisplay}</div>
        <input
          type="text"
          placeholder="default"
          onChange={this.listIdInputOnChange}
          onKeyUp={e => e.key === 'Enter' && this.go()}
          value={this.listIdInputValue()}
        />
        <button onClick={this.go}>Go</button>
        <div>
          <button onClick={this.generateRandomId}>Generate Random ID</button>
        </div>
        <div className="tooltip">
          <button
            onClick={this.copyToClipboard}
            onMouseOut={this.showCopiedToClipboard}
          >
            <span className="tooltiptext" id="myTooltip">
              Copy to Clipboard
            </span>
            Share
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  listId: state.list.id
})

export default connect(
  mapStateToProps,
  { setListId }
)(Navbar)
