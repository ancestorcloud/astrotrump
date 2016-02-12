import style from './style'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import Avatar from 'atm.Avatar'

const sizing = {
  tiny: '20px',
  small: '40px',
  default: '70px',
  large: '120px'
}

const Ancestor = ({size = 'default', gender = 'female', discovered = false}) =>
  <Avatar src={`/assets/icons/${gender}.svg`} size={sizing[size]} />

Ancestor.propTypes = {
  size: PropTypes.oneOf([
    'tiny', 'small', 'default', 'large'
  ]),
  gender: PropTypes.oneOf(['male', 'female']),
  discovered: PropTypes.bool
}

export default connect(state => ({

}))(Ancestor)
