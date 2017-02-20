import { createAsyncActions as aa } from 'utils.redux'
import axios from 'axios'
import { ogfCreds } from 'utils.firebase'

export const AUTH_UPDATE = 'AUTH_UPDATE'
export const USER_UPDATE_FACEBOOK_DATA = 'USER_UPDATE_FACEBOOK_DATA'
export const USER_UPDATE_SELECTED_PRESIDENT = 'USER_UPDATE_SELECTED_PRESIDENT'
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

export const updateSelectedPresident = (data) => ({
  type: USER_UPDATE_SELECTED_PRESIDENT,
  payload: data
})

export const receivedSessionId = (value) => ({
  type: RECEIVE_SESSION_ID_ACTION_TYPES[1],
  payload: {
    ogfSessionId: value
  }
})

export const ogfLogin = () => (dispatch, getState) => {

  const url = 'https://ws.onegreatfamily.com/v11.02/User.svc/Signin'
  ogfCreds.on('value', snapshot => {
    const credentials = snapshot.val()

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
      console.error(err)
    })
  })


}
