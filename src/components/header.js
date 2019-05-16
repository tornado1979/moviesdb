import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/brand/logo.svg'

export const Header = () => (
  <div className="header-wrapper">
    <ul className="nav justify-content-between">
      <li className="nav-item brand" style={{ marginLeft: '10px' }}>
        <a className="navbar-brand" href="/">
          <img alt="brand" height="40" src={logo} width="45" />
        </a>
      </li>
      <li>
        <ul className="nav justify-content-between menu">
          <li className="nav-item">
            <Link className="nav-link active" to="/" >Movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/stats" >Stats</Link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
)
