import {
  GET_LIST_ITEMS_REQUEST,
  GET_LIST_ITEMS_SUCCESS,
  GET_LIST_ITEMS_FAILURE,
  CREATE_LIST_ITEM,
  UPDATE_LIST_ITEM,
  DELETE_LIST_ITEM,
  SET_LIST_ID
} from '../actions/types'

const initialState = {
  id: 'default',
  items: [],
  item: {},
  isFetching: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LIST_ID:
      return { ...state, id: action.payload }
    case GET_LIST_ITEMS_REQUEST:
      return { ...state, isFetching: true }
    case GET_LIST_ITEMS_SUCCESS:
      return { ...state, isFetching: false, items: action.payload }
    case GET_LIST_ITEMS_FAILURE:
      return { ...state, isFetching: false, errorMessage: action.payload.message }
    case CREATE_LIST_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case DELETE_LIST_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      }
    case UPDATE_LIST_ITEM:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state
  }
}
