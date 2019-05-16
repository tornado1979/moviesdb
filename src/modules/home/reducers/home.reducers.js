import * as actions from '../actions'

const initialState = {
  isFetching: false,
  movies: [],
  sort: {
    sortOrder: 'popularity',
    sortType: 'desc',
  },
}
export const sort = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHANGE_SORT_ORDER:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}

export const movies = (state = initialState, action) => {
  switch (action.type) {
    case actions.CLEAR_MOVIES:
    case actions.REQUEST_MOVIES:
      return {
        ...action.payload,
      }
    case actions.RECEIVE_MOVIES:
      return {
        ...action.payload,
        movies: [...state.movies, ...action.payload.movies],
      }
    case actions.RECEIVE_MOVIES_FAIL:
      return {
        isFetching: false,
        movies: [],
      }
    default:
      return state
  }
}

export const requestNextPage = (state = [], action) => {
  switch (action.type) {
    case actions.REQUEST_NEXT_PAGE:
      return {
        action: action.payload,
      }
    default:
      return state
  }
}
