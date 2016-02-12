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

const InputField = ({label, input}) =>
  <label className={style.inputField}>
    <span className={style.label}>{label}</span>
    {input}
  </label>

const NodeFormUi = ({name, birthday, location, onInputChange, onSave}) =>
  <form>
    <fieldset className={style.fieldset}>
      <InputField className={style.inputField}
        label='Full name'
        input={<Input autofocus={true} type='text' value={name} onChange={onInputChange.bind(null, 'name')} />}
      />
      <InputField className={style.inputField}
        label='Birth date'
        input={<Input type='text' value={name} onChange={onInputChange.bind(null, 'birthday')} />}
      />
      <InputField className={style.inputField}
        label='Birth location'
        input={<Input type='text' value={name} onChange={onInputChange.bind(null, 'location')} />}
      />
    </fieldset>
    <Btn copy='Add Person' onClick={onSave} />
  </form>

const NodeForm = React.createClass({

  propTypes: {
    data: PropTypes.object,
    onSubmit: PropTypes.func,
    name: PropTypes.string
  },

  getInitialState () {
    return {
      ...this.props.data
    }
  },

  onInputChange (key, {target: { value }}) {

    this.setState({
      ...this.state,
      [key]: value
    })
  },

  onSave () {
    const { onSubmit, name } = this.props
    onSubmit(name, this.state)
  },

  render () {
    const { onSave, onInputChange, state } = this
    return <NodeFormUi { ...{ ...state, onSave, onInputChange } } />
  }
})

const ReactInputModal = ({modalIsOpen, onFormClose, formData, nodeTitle, onNodeUpdate}) =>
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={onFormClose}
    style={modalStyles} >

    <h2 className={style.heading}>{nodeTitle}</h2>
    <NodeForm name={nodeTitle} data={formData} onSubmit={onNodeUpdate} />
  </Modal>

export default ReactInputModal
