import React, {PropTypes} from 'react'
import style from './style'

const Avatar = ({ src, size }) => {
  return (
    <div
      className={style.wrapper}
      style={{
        width: size,
        height: size,
        backgroundImage: `url('${src}')`
      }}
    />
  )
}

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf(128)
}

export default Avatar
