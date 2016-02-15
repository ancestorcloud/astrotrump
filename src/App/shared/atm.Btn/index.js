import style from './style'
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

const Btn = ({copy, theme = 'navy', iconSrc, ...props}) => (
  <button { ...props } styleName={`${theme}${iconSrc ? ' iconCopy' : ''}`}>
    {
      iconSrc
      ? <img
        styleName='icon'
        src={iconSrc}
      />
      : undefined
    }
    <span styleName='copy'>{copy}</span>
  </button>
)

Btn.propTypes = {
  copy: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  theme: PropTypes.oneOf(['aqua', 'facebook', 'twitter', 'rust']),
  type: PropTypes.string,
  iconSrc: PropTypes.string
}

export default CSSModules(Btn, style, {
  errorWhenNotFound: false,
  allowMultiple: true
})
