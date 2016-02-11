import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'App'
import Landing from 'App/views/Landing'
import Tree from 'App/views/Tree'
import Result from 'App/views/Result'

import { makeAsyncScript } from '../App/shared/hoc.asyncScriptLoader'

const getRoute = ({ index, path, component, children = [] }, key) =>
index
? <IndexRoute {...{path, component, key}} />
: <Route {...{path, component, key}} >
  {
    children.map((childRoute, index) => getRoute(childRoute, index))
  }
</Route>

const routes = getRoute(
  { path: '/', component: App, children: [
    { index: true, component: makeAsyncScript({
      Component: Landing,
      scriptUrl: '//connect.facebook.net/en_US/sdk.js',
      globalName: 'FB'
    }) },
    { path: 'landing/:person', component: Landing },
    { path: 'tree', component: Tree },
    { path: 'result', component: Result }
  ] }
)

export default routes
