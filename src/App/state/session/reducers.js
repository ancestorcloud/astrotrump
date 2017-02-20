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

const getRandomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const presidentsAndResults = presidents.map((presidentData, i) => {
  const { resultsCopy } = presidentData
  const results = {
    degrees: getRandomNumberBetween(18, 45),
    copy: resultsCopy[getRandomNumberBetween(0, resultsCopy.length - 1)]
  }
  return {
    ...presidentData,
    results,
    selected: i === 0
  }
})

console.log(presidentsAndResults)

const initialState = {
  user: {
    family: [],
    email: ''
  },
  presidentsAndResults,
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

  [USER_UPDATE_SELECTED_PRESIDENT]: (state, { payload: presidentId }) => {
    const presidentsAndResults = state.presidentsAndResults.map(president => ({
      ...president,
      selected: president.id === presidentId
    }))

    return {
      ...state,
      presidentsAndResults
    }
  },

  [RECEIVE_SESSION_ID_SUCCESS]: (state, { payload: { ogfSessionId } }) => ({
    ...state,
    ogfSessionId
  })
})
