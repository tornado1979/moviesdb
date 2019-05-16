import React from 'react'
import propTypes from 'prop-types'

export const ErrorPage = ({ message }) => {
  return (
    <div className="errorpanel">
      <span>{message}</span>
    </div>
  )
}

ErrorPage.propTypes = {
  message: propTypes.string.isRequired,
}
