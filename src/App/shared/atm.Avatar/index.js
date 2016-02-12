import React, {PropTypes} from 'react'
import style from './style'
import cn from 'classnames'

const Avatar = ({ src, size, showBorder = true, showAlert }) => {
  return (
    <div
      className={cn(style.Avatar, {
        [style.showBorder]: showBorder,
        [style.showAlert]: showAlert
      })}
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
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Avatar
