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
    <span>
      by <a href='http://ancestorcloud.com/#/' target='_bank'>AncestorCloud</a>
    </span>
  </div>
)

export default Footer
