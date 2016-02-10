import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Y } from 'obj.Layout'

const Tree = ({specs}) =>
  <Y styleName='container'>
    <h1 styleName='h1'>
      Tree
    </h1>
  </Y>

Tree.propTypes = {
  specs: PropTypes.array
}

export default connect(state => ({
  specs: state.appSpecs
}))(Tree)
