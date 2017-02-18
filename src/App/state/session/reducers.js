import { createReducer } from 'utils.redux'
import {
  USER_UPDATE_FACEBOOK_DATA,
  USER_UPDATE_SELECTED_PRESIDENT,
  AUTH_UPDATE,
  USER_UPDATE_RESULTS,
  RECEIVE_SESSION_ID_ACTION_TYPES
} from './actions'

const [
  RECEIVE_SESSION_ID,
  RECEIVE_SESSION_ID_SUCCESS,
  RECEIVE_SESSION_ID_FAILURE
] = RECEIVE_SESSION_ID_ACTION_TYPES

import presidents from 'config.definitions'

const initialState = {
  user: {
    family: [],
    email: ''
  },
  selectedPresident: presidents[0],
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

  [USER_UPDATE_SELECTED_PRESIDENT]: (state, { payload: presidentId }) => ({
    ...state,
    selectedPresident: presidents.filter(({id}) => id === presidentId)[0]
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
