import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Home from '../modules/home/home'
import Movie from '../modules/movie/movie'
import Stats from '../modules/stats/stats'

import { Header } from '../components'
import ErrorBoundary from '../components/errorBoundary/errorBoundary'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <ErrorBoundary>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Header />
          <Route component={Home} exact path="/" />
          <Route component={Movie} exact path="/movie/:movieId" />
          <Route component={Stats} exact path="/stats" />
        </div>
      </ErrorBoundary>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.shape().isRequired,
}

export default Root
