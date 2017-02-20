import React, { PropTypes } from 'react'

import './style'

import { connect } from 'react-redux'
import { updateViewportSize, updateScroll } from 'App/state/view/actions'

const App = React.createClass({
  propTypes: {
    children: PropTypes.node
  },

  getInitialState () {
    return {
      timers: {}
    }
  },

  runThisFunctionOnlyAfterItHasntBeenRunForACertainAmountOfTime (name, fn, time) {
    window.clearTimeout(this.state.timers[name])
    this.setState({
      ...this.state,
      timers: {
        ...this.state.timers,
        [name]: window.setTimeout(fn, time)
      }
    })
  },

  updateDimensions () {
    const { updateViewportSize } = this.props
    updateViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
      name:
        window.innerWidth < 800
        ? 'narrow'
        : 'full'
    })
  },

  startUpdateScrollTimer () {
    this.runThisFunctionOnlyAfterItHasntBeenRunForACertainAmountOfTime(
      'updateScroll',
      this.updateScroll,
      50
    )
  },

  updateScroll () {
    const { updateScroll } = this.props
    const scrollTop = window.document.body.scrollTop
    updateScroll({
      atTop: scrollTop === 0
    })
  },

  componentWillMount () {
    this.updateDimensions()
    this.updateScroll()
  },

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('scroll', this.startUpdateScrollTimer)
  },

  render () {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
})

const boundActions = {updateViewportSize, updateScroll}

export default connect(_ => _, boundActions)(App)
