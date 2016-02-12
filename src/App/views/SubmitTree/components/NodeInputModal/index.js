import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import Btn from 'atm.Btn'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.8)'
  }
}

const NodeFormUi = ({name, birthday, location, onInputChange, onSave}) =>
  <form>
    <label>
      Full Name
      <input type='text' value={name} onChange={onInputChange.bind(null, 'name')} />
    </label>
    <label>
      Birth Date
      <input type='text' value={birthday} onChange={onInputChange.bind(null, 'birthday')} />
    </label>
    <label>
      Birth Location
      <input type='text' value={location} onChange={onInputChange.bind(null, 'location')} />
    </label>
    <Btn copy='Save' onClick={onSave} />
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

    <h2>{nodeTitle}</h2>
    <NodeForm name={nodeTitle} data={formData} onSubmit={onNodeUpdate} />
  </Modal>

export default ReactInputModal
