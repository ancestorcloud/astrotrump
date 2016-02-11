import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'App'
import Landing from 'App/views/Landing'
import SubmitTree from 'App/views/SubmitTree'
import Result from 'App/views/Result'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Landing} />
    <Route path='landing/:person' component={Landing} />
    <Route path='tree' component={SubmitTree} />
    <Route path='result' component={Result} />
  </Route>
)

export default routes
