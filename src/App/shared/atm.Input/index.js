import style from './style'
import React from 'react'
import CSSModules from 'react-css-modules'

const Input = ({errorState, ...rest}) => (
  <input { ...rest } styleName={errorState ? 'error' : 'input' } />
)

export default CSSModules(Input, style, {
  errorWhenNotFound: false
})
