import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from 'redux.store'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'
import { ogfLogin } from 'App/state/session/actions'

const store = configureStore()
const dest = document.getElementById('app')

const Root = props =>
  <Provider store={store} key='provider'>
    <ReduxRouter />
  </Provider>

ReactDOM.render(<Root />, dest, () => {
  store.dispatch(ogfLogin())
})
