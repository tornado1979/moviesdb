import React from 'react'
import propTypes from 'prop-types'

export const Sort = ({ changeMoviesSorting, selectedVal }) => {
  return (
    <div className="sort">
      <form>
        <select className="sortOrderBox" onChange={(event) => changeMoviesSorting(event)} value={selectedVal} >
          <option value="POPULARITY,desc">Popularity desc</option>
          <option value="POPULARITY,asc">Popularity asc</option>
          <option value="RATE,desc">Rate desc</option>
          <option value="RATE,asc">Rate asc</option>
          <option value="DATE,desc">Date desc</option>
          <option value="DATE,asc">Date asc</option>
        </select>
      </form>
    </div>
  )
}

Sort.propTypes = {
  changeMoviesSorting: propTypes.func.isRequired,
  selectedVal: propTypes.string.isRequired,
}
