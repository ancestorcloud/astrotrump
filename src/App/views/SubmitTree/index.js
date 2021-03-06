import style from './style'
import React, { PropTypes } from 'react'

import { connect } from 'react-redux'
import { captureData, updateTreeNode, findRelation } from 'App/state/actions'
import { transitionTo, replaceWith } from 'App/state/routing/actions'
import { getSelectedPresident } from 'utils.redux'

import { Y, X } from 'obj.Layout'
import Btn from 'atm.Btn'
import Avatar from 'atm.Avatar'
import TrumpConnection from 'mol.TrumpConnection'
import Footer from 'org.Footer'
import Tree from './components/Tree'
import NodeInputModal from './components/NodeInputModal'
import Progress from './components/Progress'

const sizing = {
  sm: '60',
  md: '70',
  lg: '80'
}

const determineDefault = (gender) => (gender === 'male' || gender === 'female')
  ? `/assets/icons/${gender}.svg`
  : `/assets/icons/male.svg`

const setUserAvatarProps = ({pictureUrl, gender, fieldsComplete}, showErrors) => {

  let src = pictureUrl
  let showAlert = false
  let showBorder = true

  if (!pictureUrl && !fieldsComplete) {
    src = '/assets/icons/plus.svg'
    showBorder = false
  } else if (pictureUrl && !fieldsComplete && showErrors) {
    showAlert = true
  } else if (!pictureUrl && fieldsComplete) {
    src = determineDefault(gender)
    showBorder = false
  }

  return {
    src,
    showAlert,
    showBorder
  }
}

const AncestorBlock = ({ data, onSelect, size }) =>
  <div style={{textAlign: 'center', maxWidth: sizing[size]}}>
    <div className={style.nodeWrapper} onClick={onSelect ? onSelect.bind(null, data.id) : _ => _}>
      <Avatar size={sizing[size]} { ...setUserAvatarProps(data, onSelect) } />
    </div>
    <span style={{display: 'block', marginTop: '2px', fontSize: '1em'}}>
      {data.title}
    </span>
  </div>

const SubmitTreeUi = ({president, onTreeSubmit, modalData, onNodeSelect, progress, treeData: {
  user,
  father,
  mother,
  pFather,
  pMother,
  mFather,
  mMother
}}) =>
  <div className={style.root} >
    <NodeInputModal { ...modalData } />
    <header className={style.header}>
      <div className={style.banner}>
        <img src='/images/stars.svg' />
      </div>
      <h1 className={style.h1}>Add Your Family</h1>
    </header>
    <Y y tag='main' className={style.tree} >

      <AncestorBlock data={user} size='lg' />

      <X className={style.treeBase} justify='space-between' style={{width: '100%'}}>
        <Tree
          top={<AncestorBlock data={father} size='md' onSelect={onNodeSelect}/>}
          left={<AncestorBlock data={pFather} size='sm' onSelect={onNodeSelect}/>}
          right={<AncestorBlock data={pMother} size='sm' onSelect={onNodeSelect}/>}
        />

        <Tree
          top={<AncestorBlock data={mother} size='md' onSelect={onNodeSelect}/>}
          left={<AncestorBlock data={mFather} size='sm' onSelect={onNodeSelect}/>}
          right={<AncestorBlock data={mMother} size='sm' onSelect={onNodeSelect}/>}
        />
      </X>
    </Y>
    <Y y tag='footer' className={style.footer}>

      <Btn onClick={onTreeSubmit} copy={`Match Me To ${president.lastName}`} theme='rust' style={{padding: '15px', margin: '10px 0'}} />

      <TrumpConnection {...{
        president,
        avatarSrc: user.pictureUrl,
        size: 'small'
      }} />

      <span>Add more information about your family to better match</span>

      <div style={{width: '100%'}}>
        <h4>Family Information</h4>
        <Progress percent={progress} height='25px' />
      </div>
    </Y>
    <Footer />
  </div>

SubmitTreeUi.propTypes = {}

/**
 * 1. we don't include user info even though we store it within treeData
 */
const calculateProgress = (treeData) => {
  const data = { ...treeData }
  const treeNodes = Object.keys(data)
  const progress = treeNodes
    .reduce((prev, curr) =>
      prev + calcValue(treeData[curr]),
    0) / (treeNodes.length * 3)
  return progress * 100

  function calcValue ({fullNameIsValid, birthdayIsValid, locationIsValid}) {
    let val = 0
    if (fullNameIsValid) val++
    if (birthdayIsValid) val++
    if (locationIsValid) val++
    return val
  }
}

const SubmitTree = React.createClass({

  propTypes: {
    treeData: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    isAuthenticated: PropTypes.bool
  },

  getInitialState () {
    return {
      modalIsOpen: false,
      currentNode: ''
    }
  },

  componentDidMount () {
    const { dispatch, isAuthenticated } = this.props

    if (!isAuthenticated) {
      dispatch(replaceWith('/'))
    }

  },

  onNodeUpdate (nodeName, data) {
    this.setState({
      modalIsOpen: false
    })

    this.props.dispatch(updateTreeNode(nodeName, data))
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

  onTreeSubmit () {
    const { treeData, dispatch } = this.props

    dispatch(captureData(treeData))
    dispatch(findRelation(treeData))
    dispatch(transitionTo('/result'))
  },

  render () {
    const { props, state, onTreeSubmit, onNodeSelect, onNodeUpdate, onFormClose } = this
    const { modalIsOpen, currentNode } = state
    const { treeData, president } = props
    const progress = calculateProgress(treeData)
    const nodeData = treeData[currentNode]
    const modalData = {
      modalIsOpen,
      nodeTitle: nodeData && nodeData.title,
      formData: nodeData,
      onFormClose,
      onNodeUpdate
    }

    return <SubmitTreeUi { ...{ president, onTreeSubmit, modalData, onNodeSelect, treeData, progress } } />
  }
})

export default connect((state) => {
  const {treeData, session} = state
  return {
    treeData,
    isAuthenticated: session.status === 'connected',
    president: getSelectedPresident(state)
  }
})(SubmitTree)
