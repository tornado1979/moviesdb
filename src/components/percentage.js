import React from 'react'
import propTypes from 'prop-types'

export const Percent = (props) => {
  return (
    <div className="percent">
      {props.vote_average}%
    </div>
  )
}

Percent.defaultProps = {
  vote_average: 70,
}

Percent.propTypes = {
  vote_average: propTypes.number,
}
