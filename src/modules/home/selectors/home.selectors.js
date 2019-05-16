import { createSelector } from 'reselect'
import store from '../../../store'

export const getLocalState = () => {
  return store.getState().data
}

export const getMovies = (state) => {
  return (state && state.data) || []
}

// get a slice of the active movies
export const getMoviesByNumber = createSelector(
  getMovies,
  data => {
    return (data.movies && data.movies.slice(0, 10)) || []
  },
)

export const getCurrentPage = createSelector(
  getMovies,
  data => {
    return data.page || 1
  },
)

export const getTotalPages = createSelector(
  getMovies,
  data => {
    return data.total_pages || 1
  },
)

export const getIsFetching = (state) =>
  (state &&
  state.data &&
  state.data.isFetching) || false

// get the sort object
export const getSort = (state) => {
  return state &&
   state.sort &&
   {
     sortOrder: state.sort.sortOrder,
     sortType: state.sort.sortType,
   }
}
