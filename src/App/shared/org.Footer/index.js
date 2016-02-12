import React from 'react'
import style from './style'

const Footer = () => (
  <div className={style.footer}>
    <span>built with</span>
    &nbsp;
    <img
      src='/images/heart.svg'
      style={{
        display: 'inline-block',
        width: '20px'
      }}
    />
    &nbsp;
    <span>by AncestorCloud</span>
  </div>
)

export default Footer
