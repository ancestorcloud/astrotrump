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

import presidents from 'config.definitions'

import { updateAuthResponse, updateSelectedPresident, updateFacebookUserData, updateResults } from 'App/state/session/actions'

const getRandomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

/**
 * This is called with the results from FB.getLoginStatus().
 * 1. The response object is returned with a status field that lets the app know the current login status of the person.
 *    Full docs on the response obj can be found in the documentation for FB.getLoginStatus().
 * 2. Logged into your app and FB.
 */
const statusChangeCallback = (response /* 1 */) => {
  getStore().dispatch(updateAuthResponse(response.authResponse, response.status))

  const resultsArr = presidents[0].resultsCopy

  console.log('response: ', response)

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
  const { FB } = window

  if (!FB) return

  FB.login(() => {
    FB.getLoginStatus((response) => {
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
  sessionStatusIsConnected,
  selectedPresident,

  transitionTo,
  updateSelectedPresident
}) => {
  if (sessionStatusIsConnected) transitionTo('/tree')

  return (
    <div className={style.hero}>
      <div className={style.heroMain}>
        <img
          height='35'
          src='/images/stars.svg'
        />
        <h1 className={style.siteTitle}>Presidential Cousins</h1>
        <div style={{display: 'flex'}}>
          {presidents.map(president => {
            const selected = selectedPresident.id === president.id
            return (
              <div {...{
                className: style.avatarWrapper,
                onClick: e => updateSelectedPresident(president.id),
                style: {
                  margin: '0 8px',
                  opacity: selected ? '1.0' : '0.3'
                }
              }}>
                <Avatar {...{
                  src: president.avatar,
                  size: 150
                }} />
              </div>
            )
          })}
        </div>
        <div className={style.description}>
          {`See how closely related you are to `}
          <select {...{
            style: {
              textAlign: 'center',
              color: 'black',
              padding: '8px 16px'
            },
            value: selectedPresident.id,
            onChange: e => updateSelectedPresident(e.target.value)
          }}>
            {presidents.map(({id, name}) =>
              <option {...{
                value: id
              }}>{name}</option>
            )}
          </select>
        </div>
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
  transitionTo: PropTypes.func,
  updateSelectedPresident: PropTypes.func
}

const boundActions = { transitionTo, updateSelectedPresident }

export default connect(({session}) => ({
  sessionStatusIsConnected: session.status === 'connected',
  selectedPresident: session.selectedPresident
}), boundActions)(Landing)
