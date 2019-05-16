import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Crosshair,
  VerticalBarSeries,
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
} from 'react-vis'

import Chart from './lib/Chart'
import * as action from '../home/actionCreators'

import './stats.scss'

import {
  getMoviesByNumber,
  getSort,
} from '../home/selectors'

class Stats extends Component {
  constructor(props) {
    super(props)
    this.onNearestX = this.onNearestX.bind(this)
    this.state = {
      crosshairValues: [],
      data1: [
        { xValue: 'test', yValue: 2 },
        { xValue: 'test', yValue: 12 },
        { xValue: 'test', yValue: 5 },
        { xValue: 'test', yValue: 7 },
        { xValue: 'test', yValue: 5 },
      ],
      data2: [
        { xValue: 'test', yValue: 2 },
        { xValue: 'test', yValue: 12 },
        { xValue: 'test', yValue: 5 },
        { xValue: 'test', yValue: 7 },
        { xValue: 'test', yValue: 5 },
      ],
      data3: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
        { x: 6, y: 1 },
        { x: 7, y: 1 },
        { x: 8, y: 1 },
        { x: 9, y: 1 },
      ],
      data4: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
        { x: 5, y: 1 },
        { x: 6, y: 1 },
        { x: 7, y: 1 },
        { x: 8, y: 1 },
        { x: 9, y: 1 },
      ],
    }
  }

  async componentDidMount() {
    const {
      clearMoviesData,
      changeSorting,
      fetchMovies,
    } = this.props

    // dispatch clear_movies
    clearMoviesData()

    // dispatch change_sortorder
    changeSorting({
      sortOrder: 'RATE',
      sortType: 'desc',
    })

    // dispatch fetch_movies
    try {
      await fetchMovies({ sortOrder: 'RATE', sortType: 'desc' }) // disable-eslint-line
      const {
        movies,
      } = this.props
      return this.updateLocalState(movies)
    } catch (error) {
      return error
    }

    /* await fetchMovies({ sortOrder: 'RATE', sortType: 'desc' })
      .then(res => { // eslint-disable-line
        const {
          movies,
        } = this.props

        this.updateLocalState(movies)
      }) */
  }

  onNearestX(datapoint, { index }) {
    this.setState({
      crosshairValues: [this.state.data3[index]],
    })
  }

  updateLocalState(movies) {
    // loop movies
    const chartData = movies.map(movie => {
      return { xValue: movie.title, yValue: movie.vote_average }
    })

    const chartData2 = movies.map(movie => {
      return { xValue: movie.title, yValue: movie.vote_count }
    })

    const chartData3 = movies.map(movie => {
      return { opacity: 0.74, x: movie.title.substring(0, 15).concat('..'), y: movie.vote_count }
    })

    const chartData4 = movies.map(movie => {
      return { opacity: 0.74, x: movie.title.substring(0, 15).concat('..'), y: movie.vote_average }
    })

    this.setState({
      data1: chartData,
      data2: chartData2,
      data3: chartData3,
      data4: chartData4,
    })
  }

  render() {
    const width = 1000
    const height = 500
    const title = 'Bar Chart'

    const xScale = 'ordinal'
    const xLabel = 'Letter'
    const yLabel = 'Frequency'
    const yTicks = [10, '%']

    return (
      <div className="wrapper">
        <div style={{ marginTop: '50px', textAlign: 'center' }}>
          <h2>Chart with react-vis</h2>
          <h4>multiple Vertical bars clustered</h4>
          <XYPlot
            animation
            height={500}
            margin={{
              bottom: 100,
            }}
            width={1000}
            xType="ordinal"
          >
            <HorizontalGridLines />
            <VerticalBarSeries
              data={this.state.data3}
              onNearestX={this.onNearestX}
              style={{
                fill: 'red',
                stroke: '#2c51be',
                strokeWidth: '3px',
              }}
            />
            <VerticalBarSeries
              data={this.state.data4}
              onNearestX={this.onNearestX}
              style={{
                fill: '#9bbdd9',
                stroke: '#2c51be',
                strokeWidth: '3px',
              }}
            />
            <LineSeries
              data={this.state.data3}
            />
            <LineSeries
              data={this.state.data4}
            />
            <XAxis
              orientation="bottom"
              position="end"
              style={{
                line: { stroke: '#ADDDE1' },
                text: { fill: '#21b034', fontSize: '12px', stroke: 'none' },
                ticks: { stroke: '#ADDDE1' },
              }}
              tickLabelAngle={-45}
              tickPadding={10}
              tickSizeInner={10}
              title="movies"
            />
            <YAxis position="end" title="rates" />
            <Crosshair values={this.state.crosshairValues} />
          </XYPlot>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2>Top 10 rated movies </h2>
          <h4> yaxis being 0 – 10 (rating) and x-axis being the top 10 movies</h4>
          <Chart
            data={this.state.data1}
            height={height}
            margin={{
              bottom: 40, left: 40, right: 140, top: 40,
            }}
            showTooltips
            title={title}
            type="bar"
            width={width}
            xLabel={xLabel}
            xScale={xScale}
            yLabel={yLabel}
            yTicks={yTicks}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2>Number of votes for each top movie</h2>
          <h4>y-axis represent the total times a movie has been rated</h4>
          <Chart
            data={this.state.data2}
            height={height}
            margin={{
              bottom: 40, left: 40, right: 140, top: 40,
            }}
            showTooltips
            title="Bar chart"
            type="bar"
            width={width}
            xLabel={xLabel}
            xScale={xScale}
            yLabel={yLabel}
            yTicks={yTicks}
          />
        </div>
      </div>
    )
  }
}

Stats.propTypes = {
  changeSorting: propTypes.func.isRequired,
  clearMoviesData: propTypes.func.isRequired,
  fetchMovies: propTypes.func.isRequired,
  movies: propTypes.arrayOf(propTypes.shape()).isRequired, // array of objects
}

const mapStateToProps = (state) => {
  return {
    movies: getMoviesByNumber(state, 10),
    sort: getSort(state),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changeSorting: action.changeSortOrder,
  clearMoviesData: action.clearMoviesData,
  fetchMovies: action.fetchMovies,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
