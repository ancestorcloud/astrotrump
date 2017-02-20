
/**
 * @desc Utility function that lets us express reducers as an
 * object mapping from action types to handlers instead of a
 * traditional switch statement pattern.
 */
export function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export function createAsyncActions (name) {
  const base = name.toUpperCase()
  const success = `${base}_SUCCESS`
  const failure = `${base}_FAILURE`

  return [
    base,
    success,
    failure
  ]
}

export function getSelectedPresident (state) {
  return (
    state
    && state.session
    && state.session.presidentsAndResults
  )
  && (
    state.session.presidentsAndResults.filter(president => president.selected)
    && state.session.presidentsAndResults.filter(president => president.selected)[0]
  )
  || state.session.presidentsAndResults[0]
}
