import { createReducer } from 'utils.redux'
import {
  FACEBOOK_SDK_LOADED,
  USER_UPDATE_FACEBOOK_DATA,
  AUTH_UPDATE,
  USER_UPDATE_RESULTS,
  RECEIVE_SESSION_ID_ACTION_TYPES
} from './actions'

const [
  RECEIVE_SESSION_ID,
  RECEIVE_SESSION_ID_SUCCESS,
  RECEIVE_SESSION_ID_FAILURE
] = RECEIVE_SESSION_ID_ACTION_TYPES

const initialState = {
  facebookSdkLoaded: false,
  user: {
    family: [],
    email: ''
  },
  authResponse: {},
  status: undefined
}

export const session = createReducer(initialState, {
  [FACEBOOK_SDK_LOADED]: (state) => ({
    ...state,
    facebookSdkLoaded: true
  }),

  [AUTH_UPDATE]: (state, { payload: { authResponse, status } }) => ({
    ...state,
    authResponse,
    status
  }),

  [USER_UPDATE_FACEBOOK_DATA]: (state, { payload: user }) => ({
    ...state,
    user: {
      ...state.user,
      ...user
    }
  }),

  [USER_UPDATE_RESULTS]: (state, { payload: results }) => ({
    ...state,
    results
  }),

  [RECEIVE_SESSION_ID_SUCCESS]: (state, { payload: { ogfSessionId } }) => ({
    ...state,
    ogfSessionId
  })
})
