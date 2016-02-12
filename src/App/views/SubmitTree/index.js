import style from './style'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Y, X } from 'obj.Layout'
import Btn from 'atm.Btn'
import Ancestor from 'atm.Ancestor'
import Avatar from 'atm.Avatar'
import Tree from './components/Tree'
import NodeInputModal from './components/NodeInputModal'

const sizing = {
  sm: '60',
  md: '70',
  lg: '80'
}

const AncestorBlock = ({ label= '', onSelect, size, ...rest }) =>
  <div style={{textAlign: 'center', width: '70px'}}>
    <div onClick={onSelect.bind(null, label)}>
      <Avatar size={sizing[size]} { ...rest } />
    </div>
    <span style={{display: 'block', marginTop: '2px', fontSize: '.8em'}}>
      {label}
    </span>
  </div>

const determineDefault = (gender) => (gender === 'male' || gender === 'female')
  ? `/assets/icons/${gender}.svg`
  : `/assets/icons/male.svg`

const setUserAvatar = ({picture = {}, gender}) => picture.url
  ? picture.url
  : determineDefault(gender)

const SubmitTreeUi = ({modalData, onNodeSelect, user}) =>
  <div className={style.root}>
    <NodeInputModal { ...modalData } />
    <header className={style.header}>
      <div className={style.banner}>
        <img src='/images/stars.svg' />
      </div>
      <h1 className={style.h1}>Add Your Family</h1>
    </header>
    <Y y className={style.tree}>
      <Tree
        top={
          <AncestorBlock label={user.first_name} src={setUserAvatar(user)} size='lg' onSelect={onNodeSelect}/>
        }
        left={
          <Tree
            top={<AncestorBlock label='Father' src='/assets/icons/male.svg' size='md' onSelect={onNodeSelect}/>}
            left={<AncestorBlock label='Paternal Grandfather' src='/assets/icons/male.svg' size='sm' onSelect={onNodeSelect}/>}
            right={<AncestorBlock label='Paternal Grandmother' src='/assets/icons/female.svg' size='sm' onSelect={onNodeSelect}/>}
          />
        }
        right={
          <Tree
            top={<AncestorBlock label='Mother' src='/assets/icons/female.svg' size='md' onSelect={onNodeSelect}/>}
            left={<AncestorBlock label='Maternal Grandfather' src='/assets/icons/male.svg' size='sm' onSelect={onNodeSelect}/>}
            right={<AncestorBlock label='Maternal Grandmother' src='/assets/icons/female.svg' size='sm' onSelect={onNodeSelect}/>}
          />
        }
      />
    </Y>
    <Y y tag='footer'>
      <Btn copy='See Your Relation' theme='rust' />
    </Y>
  </div>

SubmitTreeUi.propTypes = {}

const SubmitTree = React.createClass({

  propTypes: {
    user: PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      modalIsOpen: false,
      currentNode: '',
      treeData: {
        'Father': {},
        'Mother': {},
        'Paternal Father': {},
        'Paternal Mother': {},
        'Maternal Father': {},
        'Maternal Mother': {}
      }
    }
  },

  onNodeUpdate (nodeName, data) {
    this.setState({
      modalIsOpen: false,
      treeData: {
        ...this.state.treeData,
        [nodeName]: data
      }
    })
  },

  onNodeSelect (nodeName) {
    this.setState({
      modalIsOpen: true,
      currentNode: nodeName
    })
  },

  onFormClose () {
    this.setState({
      modalIsOpen: false,
      currentNode: ''
    })
  },

  render () {
    const { state, onNodeSelect, onNodeUpdate, onFormClose } = this
    const { modalIsOpen, treeData, currentNode } = state
    const modalData = {
      modalIsOpen,
      nodeTitle: currentNode,
      formData: treeData[currentNode],
      onFormClose,
      onNodeUpdate
    }

    return <SubmitTreeUi { ...{ modalData, onNodeSelect, ...this.props } } />
  }
})

export default connect(({session}) => ({
  user: session.user
}))(SubmitTree)
