import style from './style'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { captureData, updateTreeNode, findRelation } from 'App/state/actions'
import { transitionTo, replaceWith } from 'App/state/routing/actions'
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

const AncestorBlock = ({ data, onSelect, size, showTitle = true }) =>
  <div style={{textAlign: 'center', maxWidth: sizing[size]}}>
    <div className={style.nodeWrapper} onClick={onSelect ? onSelect.bind(null, data.id) : _ => _}>
      <Avatar size={sizing[size]} { ...setUserAvatarProps(data, onSelect) } />
    </div>
    {showTitle ?
      <span style={{display: 'block', marginTop: '2px', fontSize: '1em'}}>
        {data.title}
      </span>
    : undefined }
  </div>

const SubmitTreeUi = ({onTreeSubmit, modalData, onNodeSelect, progress, treeData: {
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

      <X>
        <AncestorBlock data={user} size='lg' />
      </X>

      <X style={{width: '60%'}} justify='space-between'>
        <AncestorBlock data={father} size='md' onSelect={onNodeSelect} showTitle={true}/>
        <AncestorBlock data={mother} size='md' onSelect={onNodeSelect} showTitle={true}/>
      </X>

      <X style={{width: '100%'}} justify='space-between'>
        <AncestorBlock data={pFather} size='sm' onSelect={onNodeSelect} showTitle={true}/>
        <AncestorBlock data={pMother} size='sm' onSelect={onNodeSelect} />
        <AncestorBlock data={mFather} size='sm' onSelect={onNodeSelect} />
        <AncestorBlock data={mMother} size='sm' onSelect={onNodeSelect} />
      </X>
    </Y>

    <Y y tag='footer' className={style.footer}>
      <div style={{width: '100%'}}>
        <h4>Data Completion</h4>
        <Progress percent={progress} height='25px' />
      </div>

      <span>Add more information about your family to better match</span>

      <Btn onClick={onTreeSubmit} copy='See Your Relation' theme='rust' style={{padding: '15px', width: '60%'}} />

      <TrumpConnection avatarSrc={user.pictureUrl} size='small'/>
    </Y>
    <Footer />
  </div>

SubmitTreeUi.propTypes = {}

/**
 * 1. we don't include user info even though we store it within treeData
 */
const calculateProgress = (treeData) => {
  const data = { ...treeData }
  delete data.user /* [1] */
  const treeNodes = Object.keys(data)
  const progress = treeNodes
    .reduce((prev, curr) =>
      prev + Number(treeData[curr].fieldsComplete),
    0) / treeNodes.length
  return progress * 100
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
    const { treeData } = props
    const progress = calculateProgress(treeData)
    const nodeData = treeData[currentNode]
    const modalData = {
      modalIsOpen,
      nodeTitle: nodeData && nodeData.title,
      formData: nodeData,
      onFormClose,
      onNodeUpdate
    }

    return <SubmitTreeUi { ...{ onTreeSubmit, modalData, onNodeSelect, treeData, progress } } />
  }
})

export default connect(({treeData, session}) => ({
  treeData,
  isAuthenticated: session.status === 'connected'
}))(SubmitTree)
