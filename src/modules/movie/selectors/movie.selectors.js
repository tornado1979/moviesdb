import { createSelector } from 'reselect'

export const getMovie = state => (state && state.movie && state.movie.movie) || {}
export const getCrew = createSelector(
  getMovie,
  movie => {
    return (movie.credits &&
      movie.credits.crew &&
      movie.credits.crew.slice(0, 3)) || []
  },
)

export const getIsFetching = (state) =>
  (state &&
  state.movie &&
  state.movie.isFetching) || false
