import style from './style'
import React from 'react'
import { X } from 'obj.Layout'

const Tree = ({top, left, right}) =>
  <div>
    <X y>
      {top}
    </X>
    <X className={style.base}>
      {left}
      <span style={{width: '20px'}} />
      {right}
    </X>
  </div>

export default Tree
