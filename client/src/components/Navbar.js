import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuid from 'uuid'
import { setListId } from '../actions/listActions'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.props.setListId(props.match.params.id)
    this.state = {
      listIdDisplay: props.match.params.id,
      listIdPending: props.match.params.id
    }
  }

  listIdInputOnChange = e => this.setState({ listIdPending: e.target.value })
  listIdInputValue = () =>
    this.state.listIdPending === 'default' ? '' : this.state.listIdPending

  go = () => {
    const listId = this.state.listIdPending || 'default'
    if (listId === this.listIdDisplay) {
      return
    }
    this.setState({ listIdDisplay: listId })
    this.props.setListId(listId)
    this.props.history.replace(`/list/${listId}`, 'refresh')
  }

  generateRandomId = () => this.setState({ listIdPending: uuid() })

  copyToClipboard = () => {
    const copyText = `https://simply-do.herokuapp.com${
      this.props.history.location.pathname
    }`
    navigator.clipboard
      .writeText(copyText)
      .then(() => console.log(`copied ${copyText} to clipboard!`))
      .catch(err => console.error('error copying to clipboard:', err))

    document.getElementById('myTooltip').innerHTML = 'Copied Link to Clipboard!'
  }

  showCopiedToClipboard = () => {
    document.getElementById('myTooltip').innerHTML = 'Copy to Clipboard'
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

export default withRouter(
  connect(
    mapStateToProps,
    { setListId }
  )(Navbar)
)
