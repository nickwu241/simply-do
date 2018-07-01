import {
  GET_LIST_ITEMS,
  CREATE_LIST_ITEM,
  DELETE_LIST_ITEM,
  UPDATE_LIST_ITEM,
  SET_LIST_ID
} from './types'

export const setListId = listId => dispatch => {
  dispatch({
    type: SET_LIST_ID,
    payload: listId
  })
}

export const getListItems = listId => dispatch => {
  fetch(`/api/list/${listId}/items`)
    .then(res => res.json())
    .then(list =>
      dispatch({
        type: GET_LIST_ITEMS,
        payload: list
      })
    )
}

export const createEmptyListItem = listId => dispatch => {
  fetch(`/api/list/${listId}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: '',
      checked: false
    })
  })
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: CREATE_LIST_ITEM,
        payload: item
      })
    )
}

export const deleteListItem = (listId, itemId) => dispatch => {
  fetch(`/api/list/${listId}/items/${itemId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(_ => {
      dispatch({
        type: DELETE_LIST_ITEM,
        payload: itemId
      })
    })
}

export const updateListItem = (listId, item) => dispatch => {
  fetch(`/api/list/${listId}/items/${item._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(res => res.json())
    .then(item =>
      dispatch({
        type: UPDATE_LIST_ITEM,
        payload: item
      })
    )
}
