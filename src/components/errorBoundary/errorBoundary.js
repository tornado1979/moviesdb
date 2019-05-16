import React, { Component } from 'react'
import propTypes from 'prop-types'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null,
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong!</h2>
          <p className="red">
            {this.state.error && this.state.error.toString()}
          </p>
          <div>Component Stack Error Details:</div>
          <p className="red">{this.state.errorInfo.componentStack}</p>
        </div>
      )
    }
    // default render chidren components
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: propTypes.shape().isRequired, // eslint-disable-line
}
export default ErrorBoundary
