import style from './style'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getStore } from 'redux.store'
import { transitionTo } from 'App/state/routing/actions'
import { sendUserToSlack } from 'App/state/misc/actions'

import Avatar from 'atm.Avatar'
import Btn from 'atm.Btn'
import Footer from 'org.Footer'
import StepList from './components/StepList'

import resultsArr from './results.js'

import { updateAuthResponse, updateFacebookUserData, updateResults } from 'App/state/session/actions'

const getRandomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

/**
 * This is called with the results from FB.getLoginStatus().
 * 1. The response object is returned with a status field that lets the app know the current login status of the person.
 *    Full docs on the response obj can be found in the documentation for FB.getLoginStatus().
 * 2. Logged into your app and FB.
 */
const statusChangeCallback = (response /* 1 */) => {
  getStore().dispatch(updateAuthResponse(response.authResponse, response.status))

  if (response.status === 'connected') { /* 2 */
    window.FB.api('/me?fields=name,email,gender,birthday,location,picture.type(large),family{name,birthday,bio,relationship,picture.type(large){url,is_silhouette}}', (response) => {
      getStore().dispatch(sendUserToSlack(response))
      getStore().dispatch(updateResults({
        degrees: getRandomNumberBetween(18, 45),
        copy: resultsArr[getRandomNumberBetween(0, resultsArr.length - 1)]
      }))
      getStore().dispatch(updateFacebookUserData(response))
    })
  }
}

/**
 * 1. enable cookies to allow the server to access the session
 * 2. parse social plugins on this page
 */
window.fbAsyncInit = () => {
  let appId = '1427298800906536' // prod
  if (__DEV__) { appId = '1511974445772304' } // eslint-disable-line

  window.FB.init({
    appId,
    cookie: true,   /* 1 */
    xfbml: true,    /* 2 */
    version: 'v2.5'
  })

  window.FB.getLoginStatus((response) => {
    statusChangeCallback(response)
  })
}

const login = () => {
  window.FB.login(() => {
    window.FB.getLoginStatus((response) => {
      statusChangeCallback(response)
    })
  }, {
    scope: 'public_profile,user_relationships,email',
    return_scopes: true
  })
}

const bannerImageNames = [
  'ballot.svg',
  'capital.svg',
  'elephant.svg',
  'merica.svg',
  'podium.svg',
  'vote.svg'
]

const bannerImages = [
  ...bannerImageNames,
  ...bannerImageNames,
  ...bannerImageNames,
  ...bannerImageNames
].map((imageName, i) => <img key={i} src={`/images/bannerImages/${imageName}`} />)

const Landing = ({
  session,

  transitionTo
}) => {
  if (session.status === 'connected') transitionTo('/tree')

  return (
    <div className={style.hero}>
      <div className={style.heroMain}>
        <img
          height='35'
          src='/images/stars.svg'
        />
        <h1 className={style.siteTitle}>Cousin Trump</h1>
        <div className={style.trumpWrapper}>
          <Avatar
            src='/images/trump.jpg'
            size={150}
          />
        </div>
        <div className={style.description}>See how closely related you are to Donald Trump</div>
        <a onClick={login}>
          <Btn
            theme='facebook'
            iconSrc='/images/facebook.svg'
            copy='Continue with Facebook'
          />
        </a>
        <div style={{width: '100%', maxWidth: '700px'}}>
          <StepList
            steps={[
              'Click the button',
              'Add your family',
              'Discover the truth'
            ]}
          />
        </div>
      </div>
      <div className={style.heroBanner}>
        <div className={style.heroBannerImagesWrapper}>
          {bannerImages}
        </div>
      </div>
      <Footer
        color='navy'
      />
    </div>
  )
}

Landing.propTypes = {
  session: PropTypes.object,

  transitionTo: PropTypes.func
}

export default connect(({session}) => ({
  session
}), { transitionTo })(Landing)
