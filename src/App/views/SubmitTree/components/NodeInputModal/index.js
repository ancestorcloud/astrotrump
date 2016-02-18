import style from './style'
import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import Btn from 'atm.Btn'
import Input from 'atm.Input'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    minWidth: '320px',
    padding: '40px'
  },
  overlay: {
    backgroundColor: 'rgba(30,49,65,.8)'
  }
}

const InputField = ({label, input, errorState}) =>
  <label className={style.inputField}>
    <span className={errorState ? style.errorLabel : style.label}>{label}</span>
    <Input { ...{ ...input, errorState } } />
  </label>

const NodeFormUi = ({fullName, birthday, location, onInputChange, onSave, highlightMissingData = false}) =>
  <form onSubmit={onSave}>
    <fieldset className={style.fieldset}>
      <InputField className={style.inputField}
        label='Full name'
        input={{
          autoFocus: true,
          type: 'text',
          value: fullName,
          onChange: onInputChange.bind(null, 'fullName')
        }}
        errorState={!!(!fullName && highlightMissingData)}
      />
      <InputField className={style.inputField}
        label='Birth date (MM/DD/YYYY)'
        input={{
          type: 'text',
          placeholder: 'ex: 12/05/1988',
          value: birthday,
          onChange: onInputChange.bind(null, 'birthday')
        }}
        errorState={!!(!birthday && highlightMissingData)}
      />
      <InputField className={style.inputField}
        label='Birth location'
        input={{
          type: 'text',
          placeholder: 'ex: New York, New York, USA',
          value: location,
          onChange: onInputChange.bind(null, 'location')
        }}
        errorState={!!(!location && highlightMissingData)}
      />
    </fieldset>
    <Btn copy='Add Person' type='submit' />
  </form>

const NodeForm = React.createClass({

  propTypes: {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
    name: PropTypes.string
  },

  getInitialState () {
    return {
      ...this.props.form.data
    }
  },

  getFocusEl () {

  },

  onInputChange (key, {target: { value }}) {

    this.setState({
      ...this.state,
      [key]: value
    })
  },

  onSave (e) {
    e.preventDefault()
    const { onSubmit, form } = this.props
    onSubmit(form.id, this.state)
  },

  render () {
    const { onSave, onInputChange, state, props } = this
    const { highlightMissingData } = props.form

    return <NodeFormUi { ...{ ...state, onSave, onInputChange, highlightMissingData } } />
  }
})

const ReactInputModal = ({modalIsOpen, onFormClose, formData = {}, nodeTitle, onNodeUpdate}) =>
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={onFormClose}
    style={modalStyles} >

    <h2 className={style.heading}>{formData.title}</h2>
    <NodeForm form={formData} onSubmit={onNodeUpdate} />
  </Modal>

export default ReactInputModal
