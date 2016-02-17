import { createReducer } from 'utils.redux'
import {
  USER_UPDATE_FACEBOOK_DATA,
  AUTH_UPDATE,
  USER_UPDATE_RESULTS
} from './actions'

const initialState = {
  user: {
    family: []
  },
  authResponse: {},
  status: ''
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
  })
})
