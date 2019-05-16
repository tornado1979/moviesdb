import React from 'react'
import propTypes from 'prop-types'

export const CustomButton = ({ onClick }) => (
  <button
    className="btn btn-primary btn-lg btn-block"
    onClick={ev => onClick(ev)}
    type="button"
  >
    load more movies..
  </button>
)

CustomButton.propTypes = {
  onClick: propTypes.func.isRequired,
}
