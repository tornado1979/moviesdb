// action costants
import {
  REQUEST_SEARCH,
  RESET_SEARCH,
} from '../actions'

import {
  MOVIE_SEARCH_URL,
} from '../../../constants'

import {
  receiveError,
  receiveMovies,
} from '../../home/actionCreators'

export const requestSearch = (query) => (dispatch) => {
  return dispatch({
    payload: { query },
    type: REQUEST_SEARCH,
  })
}

export const resetSearch = () => dispatch => {
  return dispatch({
    payload: { query: '' },
    type: RESET_SEARCH,
  })
}

export const searchMovies = (query) => dispatch => {
  dispatch(requestSearch(query))
  const endpoint = `${MOVIE_SEARCH_URL}&query=${query}`
  return fetch(endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => dispatch(receiveMovies(data)))
    .catch(err => dispatch(receiveError(err)))
}
