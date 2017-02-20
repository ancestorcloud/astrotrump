import React, {PropTypes} from 'react'
import style from './style'

const Footer = ({color}) => (
  <div className={style[color ? `Footer-${color}` : 'Footer']}>
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
      by <a href='http://trace.com/#/' target='_blank'>Trace</a>
    </span>
  </div>
)

Footer.propTypes = {
  color: PropTypes.oneOf(['navy'])
}

export default Footer
