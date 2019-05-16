import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import propTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'

import * as action from './actionCreators'
import * as constant from '../../constants'
import {
  getCurrentPage,
  getMovies,
  getIsFetching,
  getSort,
  getTotalPages,
} from './selectors'

import {
  getSearchText,
} from '../search/selectors'

// import components
import {
  CustomButton,
  Percent,
  Sort,
  ErrorPage,
} from '../../components'

// import modules
import SearchBox from '../search/search'
import Loader from '../loader/loader'

// import sass
import './style/home.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.changeMoviesSorting = this.changeMoviesSorting.bind(this)
    this.loadMoreMovies = this.loadMoreMovies.bind(this)
    this.clearSearchString = this.clearSearchString.bind(this)
  }

  componentDidMount() {
    this.props.clearMoviesData()
    this.props.fetchMovies(this.props.sort)
    this.props.requestNextPage() // dispatch action to update the moviesChunks
  }

  componentDidUpdate() {}

  // Load more movies on the blowser
  loadMoreMovies(ev) {
    ev.preventDefault()

    const {
      fetchMovies,
      currentPage,
      query,
      sort,
      totalPages,
    } = this.props
    // dispatch actions to fetch next page
    if (totalPages > currentPage) {
      this.props.requestNextPage(currentPage + 1)
      fetchMovies(sort, currentPage + 1, query)
    }
  }

  changeMoviesSorting(event) { // eslint-disable-line class-methods-use-this
    event.preventDefault()

    // dispatch action to update the sort values on state
    const sortTypeOrder = event.target.value.split(',')

    this.props.clearMoviesData()
    this.props.changeSorting({ sortOrder: sortTypeOrder[0], sortType: sortTypeOrder[1] })
    this.props.fetchMovies({ sortOrder: sortTypeOrder[0], sortType: sortTypeOrder[1] })
  }

  createMovies(movies) { // eslint-disable-line class-methods-use-this
    let moviesDOM
    if (movies && movies.length > 0) {
      moviesDOM = movies.map((movie, idx) => {
        let movieReleaseDate = moment(movie.release_date) // eslint-disable-line prefer-const
        return (
          <div className="panel" key={idx}>
            <div className="panel-img">
              <img alt="movie" src={`${constant.POSTER_MOVIE_IMG_URL}${movie.poster_path}`} />
            </div>
            <div className="panel-body">
              <div className="wrap-panel-top">
                <Percent
                  vote_average={movie.vote_average * 10}
                />
                <div>
                  <p className="panel-title">{movie.title}</p>
                  <p className="panel-date">{movieReleaseDate.format('MMMM DD, YYYY')} </p>
                </div>
              </div>
              <p className="panel-text">{movie.overview}</p>
              <p className="view-more">
                <Link to={`movie/${movie.id}`}>
                  more info
                </Link>
              </p>
            </div>
          </div>)
      })
    } else {
      return (
        <ErrorPage
          message="Sorry no movies found!!"
        />
      )
    }

    return moviesDOM
  }

  // clear search text and fetch all movies
  clearSearchString() {
    const {
      fetchMovies,
      sort,
    } = this.props

    fetchMovies(sort)
  }

  render() {
    const {
      isFetching,
      movies,
    } = this.props.data

    const {
      currentPage,
      sort,
      totalPages,
    } = this.props

    const moviesData = this.createMovies(movies)
    const moviesDataExist = moviesData.length > 0

    const showMore = totalPages > currentPage

    return (
      <div className="wrapper">
        {/* progress bar */}
        {isFetching && <Loader progress={1} />}

        <SearchBox
          clearSearchString={this.clearSearchString}
          minSearchChars={1}
        />
        {moviesDataExist && <Sort
          changeMoviesSorting={this.changeMoviesSorting}
          selectedVal={`${sort.sortOrder},${sort.sortType}`}
        />}
        {moviesData}
        {showMore && <CustomButton
          onClick={this.loadMoreMovies}
        />}
      </div>
    )
  }
}

Home.propTypes = {
  changeSorting: propTypes.func.isRequired,
  clearMoviesData: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
  data: propTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchMovies: propTypes.func.isRequired,
  query: propTypes.string.isRequired,
  requestNextPage: propTypes.func.isRequired,
  sort: propTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  totalPages: propTypes.number.isRequired,
}

const mapStateToProps = (state) => {
  return {
    currentPage: getCurrentPage(state),
    data: getMovies(state),
    isFetching: getIsFetching(state),
    query: getSearchText(state),
    sort: getSort(state),
    totalPages: getTotalPages(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changeSorting: action.changeSortOrder,
  clearMoviesData: action.clearMoviesData,
  fetchMovies: action.fetchMovies,
  requestNextPage: action.requestNextPage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
