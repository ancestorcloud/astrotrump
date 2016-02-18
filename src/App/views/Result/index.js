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

const Result = ({
  session: {
    user,
    results: {
      degrees: randomDegrees,
      copy: resultCopy
    }
  },
  ogfResults: {
    isFetching,
    ogfDegrees
  }
}) => {
  const degrees =
  isFetching
  ? undefined
  : ogfDegrees || randomDegrees

  const degreeWithSuffix = `${degrees}${getSuffix(degrees)}`

  const shareData = {
    link: 'https://cousintrump.com',
    title: `I'm ${degreeWithSuffix} cousins with Donald Trump!`,
    description: 'You might be related to Trump as well. Discover the truth now! #CousinTrump',
    facebookBannerImage: 'http://i.imgur.com/rYSxqyU.jpg'
  }

  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        <img src='/images/stars.svg' />
        <h2>{degrees ? 'Well would you look at that?' : 'Calculating...'}</h2>
        <div style={{
          /**
           * 1. Compensates for padding on bottom of TrumpConnection when no degree
           *    is present. This way there's no stutter when the padding is added.
           */
          paddingBottom: degrees ? '0' : '64px' /* 1 */
        }}>
          <TrumpConnection
            avatarSrc={user && user.picture && user.picture.data && user.picture.data.url}
            degrees={degrees || undefined}
            size='big'
            loading={!degrees}
          />
        </div>
      </div>
      {
        degrees
        ? (
          <div className={style.explainerWrapper}>
            <div className={style.explainer}>
              <h2>You are {degreeWithSuffix} cousins with Donald</h2>
              <div>{resultCopy}</div>
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
                      picture: shareData.facebookBannerImage
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
              <h2>#CousinTrump</h2>
              <h3 style={{
                textAlign: 'center'
              }}>How did we know?</h3>
              <div>Based on family data almost any two people can be matched to a common ancestor. We've got a global family tree with information on most people's ancestors. To accurately determine your common ancestor with Trump we need a little bit more info about your family. Your info is always kept private.</div>
              <Footer />
            </div>
          </div>
        )
        : undefined
      }
    </div>
  )
}

Result.propTypes = {
  session: PropTypes.object,
  degrees: PropTypes.number
}

export default connect(({session, ogfResults}) => ({
  session,
  ogfResults
}))(Result)
