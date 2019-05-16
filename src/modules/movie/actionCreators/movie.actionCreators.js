import {
  MOVIE_DETAILS_A,
  MOVIE_DETAILS_B,
} from '../../../constants'

// action costants
import {
  RECEIVE_MOVIE,
  REQUEST_MOVIE,
  RECEIVE_MOVIE_FAIL,
} from '../actions'

export const requestMovie = () => {
  return {
    payload: {
      isFetching: true,
      movie: {},
    },
    type: REQUEST_MOVIE,
  }
}

export const receiveMovie = (data) => {
  return {
    payload: {
      isFetching: false,
      movie: data,
    },
    type: RECEIVE_MOVIE,
  }
}

export const error = (err) => {
  return {
    payload: err,
    type: RECEIVE_MOVIE_FAIL,
  }
}

export const fetchMovie = (movieId) => (dispatch) => {
  dispatch(requestMovie())
  return fetch(`${MOVIE_DETAILS_A}${movieId}${MOVIE_DETAILS_B}`, {
    method: 'GET',
  })
    .then((res) => {
      return res.json()
    })
    .then((movie) => {
      return dispatch(receiveMovie(movie))
    })
    .catch((err) => {
      return dispatch(error(err))
    })
}
