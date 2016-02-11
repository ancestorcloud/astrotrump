import style from './style'
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

const Btn = ({copy, children, theme = 'aqua', ...props}) => (
  <button { ...props } styleName={theme}>
    { copy || children }
  </button>
)

Btn.propTypes = {
  copy: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  theme: PropTypes.string,
  type: PropTypes.string
}

export default CSSModules(Btn, style, {
  errorWhenNotFound: false
})
