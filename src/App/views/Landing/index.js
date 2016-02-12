import style from './style'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getStore } from 'redux.store'
import { transitionTo } from 'App/state/routing/actions'

import Avatar from 'atm.Avatar'
import Btn from 'atm.Btn'
import StepList from './components/StepList'

import { updateAuthResponse, updateFacebookUserData } from 'App/state/session/actions'

/**
 * This is called with the results from FB.getLoginStatus().
 * 1. The response object is returned with a status field that lets the app know the current login status of the person.
 *    Full docs on the response obj can be found in the documentation for FB.getLoginStatus().
 * 2. Logged into your app and FB.
 */
const statusChangeCallback = (response /* 1 */, updateAuthResponse, updateFacebookUserData) => {
  updateAuthResponse(response.authResponse, response.status)

  if (response.status === 'connected') { /* 2 */
    window.FB.api('/me?fields=name,gender,birthday,location,picture.type(large),family{name,birthday,bio,picture.type(large){url,is_silhouette}}', (response) => {
      updateFacebookUserData(response)
    })
  }
}

/**
 * 1. enable cookies to allow the server to access the session
 * 2. parse social plugins on this page
 */
window.fbAsyncInit = () => {
  window.FB.init({
    appId: '730729143612491',
    cookie: true,   /* 1 */
    xfbml: true,    /* 2 */
    version: 'v2.2'
  })

  window.FB.getLoginStatus((response) => {
    statusChangeCallback(
      response,
      (...args) => { getStore().dispatch(updateAuthResponse(...args)) },
      (...args) => { getStore().dispatch(updateFacebookUserData(...args)) }
    )
  })
}

const login = (updateAuthResponse, updateFacebookUserData) => {
  window.FB.login(() => {
    window.FB.getLoginStatus((response) => {
      statusChangeCallback(response, updateAuthResponse, updateFacebookUserData)
    })
  }, {
    scope: 'public_profile,user_relationships,email,birthday',
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
].map((imageName) => <img src={`/images/bannerImages/${imageName}`} />)

const Landing = ({
  session,

  updateAuthResponse,
  updateFacebookUserData,
  transitionTo
}) => {
  // if (session.status === 'connected') transitionTo('tree')

  return (
    <div className={style.hero}>
      <div className={style.heroMain}>
        <h1 className={style.siteTitle}>Cousin Trump</h1>
        <div className={style.trumpWrapper}>
          <Avatar
            src='/images/trump.jpg'
            size={150}
          />
        </div>
        <div className={style.description}>See how closely related you are to Donald Trump</div>
        <a onClick={login.bind(null, updateAuthResponse, updateFacebookUserData)}>
          <Btn
            theme='facebook'
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
      <div className={style.heroFooter}>
        <span>{'built with <3 by AncestorCloud'}</span>
      </div>
    </div>
  )
}

Landing.propTypes = {
  session: PropTypes.object,

  updateAuthResponse: PropTypes.func,
  updateFacebookUserData: PropTypes.func,
  transitionTo: PropTypes.func
}

export default connect(({session}) => ({
  session
}), { updateAuthResponse, updateFacebookUserData, transitionTo })(Landing)
