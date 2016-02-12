import React, {PropTypes} from 'react'
import style from './style'

const Step = (index, copy) => (
  <div className={style.Step}>
    <div className={style.index}>{index}</div>
    <div className={style.copy}>{copy}</div>
  </div>
)

const StepList = ({steps}) => (
  <ol className={style.StepList}>
    {steps.map((copy, index) => <li key={index}>{Step(index + 1, copy)}</li>)}
  </ol>
)

StepList.propTypes = {
  steps: PropTypes.array
}

export default StepList
