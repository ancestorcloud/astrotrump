import React, {PropTypes} from 'react'
import style from './style'

import Avatar from 'atm.Avatar'

const TrumpConnection = ({avatarSrc, degrees}) => (
  <div className={style.wrapper}>
    <Avatar
      src='/images/trump.jpg'
      size={150}
    />
    <div className={style.circleWrapper}>
      <img
        src='/images/connection-circle.svg'
        className={style.circle}
      />
      <div className={style.degreeWrapper}>
        <span className={style.degree}>{degrees}</span>
      </div>
    </div>
    <Avatar
      src={avatarSrc}
      size={150}
    />
  </div>
)

TrumpConnection.propTypes = {
  avatarSrc: PropTypes.string,
  degrees: PropTypes.number
}

export default TrumpConnection
