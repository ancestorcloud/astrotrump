import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Y } from 'obj.Layout'

const Result = ({specs}) =>
  <Y styleName='container'>
    <h1 styleName='h1'>
      Result
    </h1>
  </Y>

Result.propTypes = {
  specs: PropTypes.array
}

export default connect(state => ({
  specs: state.appSpecs
}))(Result)
