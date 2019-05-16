import { combineReducers } from 'redux'

import {
  movies as data,
  sort,
  requestNextPage,
} from './modules/home/reducers'

import {
  movie,
} from './modules/movie/reducers'

import { search } from './modules/search/reducers'

const rootReducers = combineReducers({
  action: requestNextPage,
  data,
  movie,
  search,
  sort,
})

export default rootReducers
