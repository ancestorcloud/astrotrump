import { createAsyncActions as aa } from 'utils.redux'
import axios from 'axios'

export const AUTH_UPDATE = 'AUTH_UPDATE'
export const USER_UPDATE_FACEBOOK_DATA = 'USER_UPDATE_FACEBOOK_DATA'
export const USER_UPDATE_RESULTS = 'USER_UPDATE_RESULTS'
export const RECEIVE_SESSION_ID_ACTION_TYPES = aa('RECEIVE_SESSION_ID')

export const updateAuthResponse = (authResponse, status) => ({
  type: AUTH_UPDATE,
  payload: {
    authResponse,
    status
  }
})

export const updateFacebookUserData = (data) => ({
  type: USER_UPDATE_FACEBOOK_DATA,
  payload: data
})

export const updateResults = (data) => ({
  type: USER_UPDATE_RESULTS,
  payload: data
})


export const receivedSessionId = (value) => ({
  type: RECEIVE_SESSION_ID_ACTION_TYPES[1],
  payload: {
    ogfSessionId: value
  }
})

export const ogfLogin = () => (dispatch, getState) => {

  const url = 'https://wsdev.onegreatfamily.com/v11.02/User.svc/Signin'
  const credentials = {
     userName: 'anderson_peter@live.com',
     password: 'banana',
     developerId: 'AncestorCloud',
     developerPassword: '492C4DD9-A129-4146-BAE9-D0D45FBC315C'
  }

  axios.get(url, {
    params: credentials
  })
  .then(({ data: { Value, Code, Message } }) => {
    if (Code !== 0) {
      throw new Error(Message)
    }
    dispatch(receivedSessionId(Value))
  })
  .catch(err => {
    // Try again...
    console.err(err)
  })

}
