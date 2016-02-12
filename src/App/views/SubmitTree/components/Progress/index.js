import style from './style'
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { X } from 'obj.Layout'

const normalizePercent = (p) => (p < 0)
  ? 0
  : (p > 100)
  ? 100
  : p.toFixed(0)

const setStyle = (p) => ({
  width: `${normalizePercent(p)}%`
})

const ProgressBar = ({percent = 0, height = '50px'}) =>
  <div styleName='outer' style={{height}}>
    <X x y styleName='inner' style={setStyle(percent)}>
      <div styleName='progress'>{
        (percent > 10)
        ? `${normalizePercent(percent)}%`
        : <span style={{paddingLeft: '40px'}}>{normalizePercent(percent)}%</span>
      }</div>
    </X>
  </div>

ProgressBar.propTypes = {
  percent: PropTypes.number,
  height: PropTypes.string
}

export default CSSModules(ProgressBar, style)
