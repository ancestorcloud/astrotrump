import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import style from './style'

import TrumpConnection from 'mol.TrumpConnection'
import Footer from 'org.Footer'
import Btn from 'atm.Btn'

/**
 * 1. round down to nearest ten
 * 2. get number in unit column
 */
const getSuffix = (number) => {
  const suffixMap = {
    1: 'st',
    2: 'nd',
    3: 'rd'
  }
  const unit = number - (Math.round(number / 10) * 10 /* 1 */) /* 2 */
  return suffixMap[unit] || 'th'
}

const Result = React.createClass({
  getInitialState () {
    return {
      degreesPlaceholder: false
    }
  },

  render () {
    const {session: {user}, degrees} = this.props
    const { degreesPlaceholder } = this.state
    if (!degreesPlaceholder) {
      console.log('starting timer')
      setTimeout(() => {
        console.log('setting degrees')
        this.setState({degreesPlaceholder: 27})
      }, 8000)
    }

    return (
      <div className={style.wrapper}>
        <div className={style.main}>
          <img src='/images/stars.svg' />
          <h2>{degreesPlaceholder ? 'Well would you look at that?' : 'Calculating...'}</h2>
          <TrumpConnection
            avatarSrc={user && user.picture && user.picture.data && user.picture.data.url}
            degrees={degreesPlaceholder}
            size='big'
            loading={!degreesPlaceholder}
          />
        </div>
        {
          degreesPlaceholder
          ? (
            <div className={style.explainerWrapper}>
              <div className={style.explainer}>
                <h2>You are {degreesPlaceholder}{getSuffix(degreesPlaceholder)} cousins with Donald</h2>
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
                <Footer />
              </div>
            </div>
          )
          : undefined
        }
      </div>
    )
  }
})

export default connect(({session}) => ({
  // sample data
  session: {
    user: {
      picture: {
        data: {
          url: 'http://i.imgur.com/lEzM7g8.jpg'
        }
      }
    }
  },
  degrees: false
}))(Result)
