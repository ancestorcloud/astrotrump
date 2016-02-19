export default store => next => action => {

  if (!window.ga) return next(action)

  const { type, payload } = action

  if (type === '@@reduxReactRouter/routerDidChange') {
    const { location } = payload
    const pathTo = location.pathname

    window.ga('send', 'pageview', `${pathTo}${location.search}`)

  }

  return next(action)
}

