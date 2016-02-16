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
      }, 2000)
    }

    const degreeWithSuffix = `${degreesPlaceholder}${getSuffix(degreesPlaceholder)}`

    const shareData = {
      link: 'https://cousintrump.com',
      title: `I'm ${degreeWithSuffix} cousins with Donald Trump`,
      description: 'test description'
    }

    return (
      <div className={style.wrapper}>
        <div className={style.main}>
          <img src='/images/stars.svg' />
          <h2>{degreesPlaceholder ? 'Well would you look at that?' : 'Calculating...'}</h2>
          <div style={{
            /**
             * 1. Compensates for padding on bottom of TrumpConnection when no degree
             *    is present. This way there's no stutter when the padding is added.
             */
            paddingBottom: degreesPlaceholder ? '0' : '64px' /* 1 */
          }}>
            <TrumpConnection
              avatarSrc={user && user.picture && user.picture.data && user.picture.data.url}
              degrees={degreesPlaceholder}
              size='big'
              loading={!degreesPlaceholder}
            />
          </div>
        </div>
        {
          degreesPlaceholder
          ? (
            <div className={style.explainerWrapper}>
              <div className={style.explainer}>
                <h2>You are {degreeWithSuffix} cousins with Donald</h2>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.</div>
                <div className={style.buttonsWrapper}>
                  <div>
                    <Btn
                      iconSrc='/images/facebook.svg'
                      copy='Share your cousin'
                      theme='facebook'
                      onClick={() => window.FB.ui({
                        method: 'feed',
                        display: 'popup',
                        link: shareData.link,
                        name: shareData.title,
                        description: shareData.description,
                        picture: 'http://i.imgur.com/rYSxqyU.jpg',
                        caption: 'test caption'
                      })}
                    />
                  </div>
                  <div>
                    <Btn
                      iconSrc='/images/twitter.svg'
                      copy='Share your cousin'
                      theme='twitter'
                      onClick={() => {
                        window.open(
                          `https://twitter.com/intent/tweet?text=${shareData.title} ${shareData.link}`,
                          '',
                          'fullscreen=0,height=400,width=600'
                        )
                      }}
                    />
                  </div>
                </div>
                <hr style={{
                  border: 'none',
                  width: '100%',
                  height: '3px',
                  backgroundColor: '#aaa'
                }}/>
                <h3 style={{
                  textAlign: 'center'
                }}>How did we know?</h3>
                <div>Based on family data almost any two people can be matched to a common ancestor. We've got a global family tree with information on most people's ancestors. However, we need a little bit more information about your family to accurately tell you the common ancestor between you and Trump. The above is an estimation based on the average US citizen's data.</div>
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

Result.propTypes = {
  session: PropTypes.object,
  degrees: PropTypes.number
}

export default connect(({session}) => ({
  session,
  degrees: 27
}))(Result)
