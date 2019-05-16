import {
  CLEAR_MOVIES,
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
  RECEIVE_MOVIES_FAIL,
  REQUEST_NEXT_PAGE,
  CHANGE_SORT_ORDER,
} from '../actions'

import {
  MOVIE_SEARCH_URL,
  MOVIES_SORT_BY_DATE,
  MOVIES_SORT_BY_POPULARITY,
  MOVIES_SORT_BY_RATE,
} from '../../../constants'

import { getLocalState } from '../selectors'

export const requestMovies = () => {
  const oldData = getLocalState()
  return {
    payload: {
      isFetching: true,
      movies: oldData.movies,
      page: oldData.page,
      total_pages: oldData.total_pages,
    },
    type: REQUEST_MOVIES,
  }
}

export const clearMoviesData = () => {
  return {
    payload: {
      isFetching: false,
      movies: [],
      page: 0,
      total_pages: 0,
    },
    type: CLEAR_MOVIES,
  }
}

export const receiveMovies = (data) => {
  return {
    payload: {
      isFetching: false,
      movies: data.results, // get only the movies array
      page: data.page,
      total_pages: data.total_pages,
    },
    type: RECEIVE_MOVIES,
  }
}

export const receiveError = (err) => {
  return {
    payload: err,
    type: RECEIVE_MOVIES_FAIL,
  }
}

export const fetchMovies = ({ sortOrder, sortType }, nextPage = 1, query = null) => (dispatch) => {
  dispatch(requestMovies())

  let endpoint
  // if there is a query on search box
  if (query) {
    endpoint = `${MOVIE_SEARCH_URL}&query=${query}&page=${nextPage}`
  } else {
    switch (sortOrder) {
      case 'POPULARITY':
        endpoint = `${MOVIES_SORT_BY_POPULARITY}.${sortType}&page=${nextPage}`
        break
      case 'DATE':
        endpoint = `${MOVIES_SORT_BY_DATE}.${sortType}&page=${nextPage}`
        break
      case 'RATE':
        endpoint = `${MOVIES_SORT_BY_RATE}.${sortType}&page=${nextPage}`
        break
      default:
        endpoint = `${MOVIES_SORT_BY_POPULARITY}.${sortType}&page=${nextPage}`
    }
  }

  return fetch(endpoint, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => dispatch(receiveMovies(data)))
    .catch(err => dispatch(receiveError(err)))
}

export const changeSortOrder = ({ sortOrder, sortType }) => (dispatch) => {
  dispatch({
    payload: {
      sortOrder,
      sortType,
    },
    type: CHANGE_SORT_ORDER,
  })
}

export const requestNextPage = (nextPage = 1) => (dispatch) => {
  return dispatch({
    payload: nextPage,
    type: REQUEST_NEXT_PAGE,
  })
}
