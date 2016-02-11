import style from './style'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getStore } from 'redux.store'

import { Y } from 'obj.Layout'

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
    window.FB.api('/me', (response) => {
      updateFacebookUserData(response)
    })
    window.FB.api('/me/family', (response) => {
      updateFacebookUserData({ family: response.data })
    })
    window.FB.api('/me/picture', (response) => {
      updateFacebookUserData({ picture: response.data })
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
      console.log('response: ', response)
      statusChangeCallback(response, updateAuthResponse, updateFacebookUserData)
    })
  }, {
    scope: 'user_relationships,email',
    return_scopes: true
  })
}

const Landing = ({
  session,

  updateAuthResponse,
  updateFacebookUserData
}) => (
  <Y>
    <h1>Landing</h1>
    <div>
      {
        session.status === 'connected'
        ? <pre>{JSON.stringify(session, null, 2)}</pre>
        : (
          <a
            style={{color: '#00f'}}
            onClick={login.bind(null, updateAuthResponse, updateFacebookUserData)}
          >Login with Facebook</a>
        )
      }
    </div>
  </Y>
)

Landing.propTypes = {
  session: PropTypes.object,

  updateAuthResponse: PropTypes.func,
  updateFacebookUserData: PropTypes.func
}

export default connect(({session}) => { console.log('session: ', session); return {
  session
}}, { updateAuthResponse, updateFacebookUserData })(Landing)
