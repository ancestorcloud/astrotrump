import { createReducer } from 'utils.redux'
import {
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
  user: {
    family: []
  },
  authResponse: {},
  status: undefined
}

export const session = createReducer(initialState, {
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
