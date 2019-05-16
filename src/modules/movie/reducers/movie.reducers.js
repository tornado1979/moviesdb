import {
  REQUEST_MOVIE,
  RECEIVE_MOVIE,
  RECEIVE_MOVIE_FAIL,
} from '../actions'

export const movie = (state = [], action) => {
  switch (action.type) {
    case REQUEST_MOVIE:
      return {
        ...action.payload,
      }
    case RECEIVE_MOVIE:
      return {
        ...action.payload,
      }
    case RECEIVE_MOVIE_FAIL:
      return {
        isFetching: false,
        movie: {},
      }
    default:
      return state
  }
}
