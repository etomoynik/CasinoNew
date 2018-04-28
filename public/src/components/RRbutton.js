import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Button } from 'react-toolbox'

const handleClick = (event, history, to) => {
  event.preventDefault()

  history.push(typeof to === 'object' ? to.pathname : to)
}

const RRLink = ({ to, exact, strict, ...rest }) =>
  <Route path={to} exact={exact} strict={strict} children={({ history, match }) => (
    <Button {...rest} active={!!match} onClick={(event) => handleClick(event, history, to)} />
  )} />

RRLink.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }),
    PropTypes.string
  ]).isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool
}

export default RRLink