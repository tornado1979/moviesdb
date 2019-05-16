import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import moment from 'moment'

// import scss
import './style/movie.scss'

// import * as message from '../../constants'

import {
  fetchMovie,
} from './actionCreators'

import {
  getMovie,
  getCrew,
  getIsFetching,
} from './selectors'

// import components
import Loader from '../loader/loader'
import * as constant from '../../constants'

class Movie extends Component {
  /*
  constructor(props) {
    super(props)
    this.goto = this.goto.bind(this)
  }
*/
  componentDidMount() {
    const {
      movieId,
    } = this.props.match.params
    this.props.fetchMovie(movieId)
  }

  buildCrewDOM(crew) { // eslint-disable-line class-methods-use-this
    return crew.map(person => (
      <span key={person.credit_id}>
        <p>{person.job}</p>
        <p>{person.name}</p>
      </span>
    ))
  }

  render() {
    const {
      isFetching,
      movie,
      crew,
    } = this.props
    const sheets = document.styleSheets
    const selector = '.movie-wrapper::before'
    const replacementBG = `url(${constant.BG_MOVIE_URL}${movie.backdrop_path})`

    // replace background-image
    /* eslint-disable no-restricted-syntax */
    for (const sheet of sheets) {
      if (sheet.href !== 'https://fonts.googleapis.com/css?family=Montserrat') {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText === selector) {
            rule.style.backgroundImage = replacementBG
          }
        }
      }
    }
    const movieReleaseDate = moment(movie.release_date)
    const crewData = this.buildCrewDOM(crew)
    return (
      <div className="top-wrapper">
        <div className="movie-wrapper">
          {/* progress bar */}
          {isFetching && <Loader progress={1} />}
          <div className="custom-bg">
            <div className="panel">
              <div className="img">
                <img alt="movie" src={`${constant.POSTER_MOVIE_IMG_URL_LARGE}${movie.poster_path}`} />
              </div>
              <div className="body">
                <div className="wrap-body">
                  <div>
                    <p className="title">{movie.title}<span className="date">({movieReleaseDate.format('YYYY')})</span></p>
                    <p>Original Language ({movie.original_language})</p>
                  </div>
                  <div className="overview">
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                  </div>
                  <div className="credits">
                    <h3>Featured Crew</h3>
                    <div>{crewData}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Movie.propTypes = {
  crew: propTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchMovie: propTypes.func.isRequired,
  isFetching: propTypes.bool.isRequired,
  match: propTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  movie: propTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

const mapStateToProps = (state) => {
  const crewData = getCrew(state)
  return {
    crew: crewData.length === 0 ? [] : crewData,
    isFetching: getIsFetching(state),
    movie: getMovie(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMovie,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Movie)
