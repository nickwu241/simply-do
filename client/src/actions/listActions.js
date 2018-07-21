import Cookies from 'js-cookie'
import {
  GET_LIST_ITEMS_REQUEST,
  GET_LIST_ITEMS_SUCCESS,
  GET_LIST_ITEMS_FAILURE,
  CREATE_LIST_ITEM,
  DELETE_LIST_ITEM,
  UPDATE_LIST_ITEM,
  SET_LIST_ID
} from './types'

export const setListId = listId => dispatch => {
  Cookies.set('lastListId', listId, { expires: 7 })
  fetch(`/api/list/${listId}/exists`)
    .then(res => res.json())
    .then(data => {
      if (data.exists) {
        dispatch({ type: SET_LIST_ID, payload: listId })
      } else {
        fetch(`/api/list/${listId}`, {
          method: 'POST'
        })
          .then(res => res.json())
          .then(_ => {
            dispatch({
              type: SET_LIST_ID,
              payload: listId
            })
          })
      }
    })
}

export const getListItems = listId => dispatch => {
  dispatch({ type: GET_LIST_ITEMS_REQUEST, })
  fetch(`/api/list/${listId}/items`)
    .then(res => res.json())
    .then(list => dispatch({ type: GET_LIST_ITEMS_SUCCESS, payload: list }))
    .catch(err => dispatch({ type: GET_LIST_ITEMS_FAILURE, payload: err }))
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
