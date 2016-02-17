export const AUTH_UPDATE = 'AUTH_UPDATE'
export const USER_UPDATE_FACEBOOK_DATA = 'USER_UPDATE_FACEBOOK_DATA'
export const USER_UPDATE_RESULTS = 'USER_UPDATE_RESULTS'

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
