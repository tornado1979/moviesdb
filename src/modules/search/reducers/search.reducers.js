import {
  RESET_SEARCH,
  REQUEST_SEARCH,
} from '../actions'

export const search = (state = { query: '' }, action) => {
  switch (action.type) {
    case RESET_SEARCH:
    case REQUEST_SEARCH:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
