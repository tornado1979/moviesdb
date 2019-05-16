import React, { Component } from 'react'
import propTypes from 'prop-types'
import './style/loader.scss'

class Loader extends Component {
  constructor(props) {
    super(props)
    this.updateProgress = this.updateProgress.bind(this)
    this.state = { progress: this.props.progress }

    this.nIntervalId = setInterval(() => {
      this.setState({ progress: this.state.progress + 1 })
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.nIntervalId)
  }

  updateProgress() {
    if (this.state.progress === 100) {
      clearInterval(this.nIntervalId)
    }
    return (
      <div className="progress">
        <div
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow="100"
          className="progress-bar"
          role="progressbar"
          style={{ width: `${this.state.progress}%` }}
        >{this.state.progress}%
        </div>
      </div>
    )
  }

  render() {
    return (
      this.updateProgress()
    )
  }
}

Loader.propTypes = {
  progress: propTypes.number.isRequired,
}
export default Loader
