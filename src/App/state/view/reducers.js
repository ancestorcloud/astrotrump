import { combineReducers } from 'redux'
import { createReducer } from 'utils.redux'

import { VIEWPORT_SIZE_UPDATE, SCROLL_UPDATE } from './actions'

const initialState = {
  viewState: {
    viewportSize: {
      width: 1000,
      height: 1000,
      name: 'narrow'
    },
    scroll: {
      atTop: false
    }
  }
}

export const viewState = combineReducers({
  viewportSize: createReducer(initialState.viewState.viewportSize, {
    [VIEWPORT_SIZE_UPDATE]: (state, { payload }) => payload.size
  }),
  scroll: createReducer(initialState.viewState.scroll, {
    [SCROLL_UPDATE]: (state, { payload }) => payload
  })
})
