import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducers from './rootreducers'
import loggerMiddleware from './middlewares/logger'

export const history = createHistory()

// Initial state
const initialState = {
  sort: {
    sortOrder: 'POPULARITY',
    sortType: 'desc',
  },
}

const enhancers = []
const middleware = [
  thunk,
]

if (process.env.NODE_ENV === 'development') {
  middleware.push(loggerMiddleware)
  const devToolsExtension = window.devToolsExtension // eslint-disable-line prefer-destructuring

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
)

const store = createStore(
  rootReducers,
  initialState,
  composedEnhancers,
)
/*
window.addEventListener('resize', () => {
  store.dispatch(screenResize({innerHeight: window.innerHeight, innerWidth: window.innerWidth}))
});
BrowserHistory.listen(location => redux.dispatch(routeLocationDidUpdate(location))); */
export default store
