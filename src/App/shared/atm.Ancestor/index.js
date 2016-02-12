import style from './style'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

const sizing = {
  tiny: '20px',
  small: '40px',
  default: '70px',
  large: '120px'
}

const setSize = size => ({
  width: size,
  height: size
})

const Ancestor = ({size = 'default', gender = 'female', discovered = false}) =>
  <div
    style={{ ...setSize(sizing[size]) }}
    className={cn({
      [style.discovered]: discovered,
      [style.undiscovered]: !discovered,
      [style.male]: gender === 'male',
      [style.female]: gender === 'female'
    })}
  />

Ancestor.propTypes = {
  size: PropTypes.oneOf([
    'tiny', 'small', 'default', 'large'
  ]),
  gender: PropTypes.oneOf(['male', 'female']),
  discovered: PropTypes.bool
}

export default connect(state => ({

}))(Ancestor)
