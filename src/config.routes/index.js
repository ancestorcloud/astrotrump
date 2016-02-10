import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'App'
import Landing from 'App/views/Landing'
import Tree from 'App/views/Tree'
import Result from 'App/views/Result'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Landing} />
    <Route path='landing/:person' component={Landing} />
    <Route path='tree' component={Tree} />
    <Route path='result' component={Result} />
  </Route>
)

export default routes
