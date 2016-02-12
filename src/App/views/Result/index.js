import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import style from './style'

import TrumpConnection from './components/TrumpConnection'
import Footer from 'org.Footer'
import Btn from 'atm.Btn'

/**
 * 1. round down to nearest ten
 * 2. get number in unit column
 */
const getSuffix = (number) => {
  const unit = number - (Math.round(number / 10) * 10 /* 1 */) /* 2 */
  return unit === 1
  ? 'st'
  : unit === 2
  ? 'nd'
  : unit === 3
  ? 'rd'
  : 'th'
}

const Result = ({
  session: {
    user
  },
  degrees
}) => (
  <div className={style.wrapper}>
    <div className={style.main}>
      <img src='/images/stars.svg' />
      <h2>Well would you look at that?</h2>
      <TrumpConnection
        avatarSrc={user && user.picture && user.picture.data && user.picture.data.url}
        degrees={degrees}
      />
    </div>
    <div className={style.explainer}>
      <h2>You are {degrees}{getSuffix(degrees)} cousins with Donald</h2>
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.</div>
      <div className={style.buttonsWrapper}>
        <div>
          <Btn
            copy='Share your cousin'
          />
        </div>
        <div>
          <Btn
            copy='Share your cousin'
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

Result.propTypes = {
  specs: PropTypes.array
}

export default connect(({session}) => ({
  // sample data
  session: {
    user: {
      picture: {
        data: {
          url: 'https:\/\/scontent.xx.fbcdn.net\/hprofile-xfa1\/v\/t1.0-1\/s200x200\/10354686_10150004552801856_220367501106153455_n.jpg?oh=84e7999c372de15d97a6043b6c81f35c&oe=57378050'
        }
      }
    }
  },
  degrees: 27
}))(Result)
