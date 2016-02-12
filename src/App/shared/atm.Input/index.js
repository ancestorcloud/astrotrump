import style from './style'
import React from 'react'
import CSSModules from 'react-css-modules'

const Input = (props) => (
  <input { ...props } styleName='input' />
)

export default CSSModules(Input, style, {
  errorWhenNotFound: false
})
