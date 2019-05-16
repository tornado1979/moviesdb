import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import './style/search.scss'

import {
  resetSearch,
  requestSearch,
  searchMovies,
} from './actionCreators'

import {
  clearMoviesData,
} from '../home/actionCreators'

class Search extends Component {
  constructor(props) {
    super(props)
    this.requestSearch = this.requestSearch.bind(this)
    this.clearSearchString = this.clearSearchString.bind(this)
  }

  requestSearch() {
    const {
      minSearchChars,
    } = this.props
    const searchValue = this.refs.searchbox.value // eslint-disable-line react/no-string-refs
    if (searchValue.length > minSearchChars) {
      this.props.clearMoviesData()
      this.props.searchMovies(searchValue)
    } else if (searchValue.length === 0) {
      this.props.clearMoviesData()
      this.clearSearchString()
    }
  }

  clearSearchString() {
    const inputSearch = document.getElementById('inputSearch')
    inputSearch.value = ''
    this.props.resetSearch()
    this.props.clearSearchString()
  }

  render() {
    return (
      <div className="input-group mb-3 searchbox">
        <input
          aria-label="search movies..."
          className="form-control"
          id="inputSearch"
          onKeyUp={this.requestSearch}
          placeholder="search movies..."
          ref="searchbox" // eslint-disable-line react/no-string-refs
          type="text"
        />
        <i className="fas fa-search" />
      </div>
    )
  }
}

Search.propTypes = {
  clearMoviesData: PropTypes.func.isRequired,
  clearSearchString: PropTypes.func.isRequired,
  minSearchChars: PropTypes.number.isRequired,
  requestSearch: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  searchMovies: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  clearMoviesData,
  requestSearch,
  resetSearch,
  searchMovies,
}, dispatch)

export default connect(null, mapDispatchToProps)(Search)
