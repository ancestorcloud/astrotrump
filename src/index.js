import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from 'redux.store'
import { Provider } from 'react-redux'
import { loadState, saveState } from './redux.localStorage'
import { ReduxRouter } from 'redux-router'
import { ogfLogin } from 'App/state/session/actions'

const persistedState = loadState()
const store = configureStore(persistedState)
const dest = document.getElementById('app')

store.subscribe(() => {
  const { session, treeData } = store.getState()
  saveState({
    session,
    treeData
  })
})

const Root = props =>
  <Provider store={store} key='provider'>
    <ReduxRouter />
  </Provider>

ReactDOM.render(<Root />, dest, () => {
  store.dispatch(ogfLogin())
})
