import style from './style'
import React from 'react'
import { X } from 'obj.Layout'

const Tree = ({top, left, right}) =>
  <div style={{display: 'inline-block'}}>
    <X y>
      {top}
    </X>
    <X style={{marginTop: '10px'}}>
      {left}
      <span style={{width: '20px'}} />
      {right}
    </X>
  </div>

export default Tree
