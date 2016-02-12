import React, {PropTypes} from 'react'
import style from './style'

const Avatar = ({ src, size }) => {
  return (
    <div
      className={style.Avatar}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url('${src}')`
      }}
    />
  )
}

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf([150])
}

export default Avatar
