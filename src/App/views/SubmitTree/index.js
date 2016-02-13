import style from './style'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateTreeNode } from 'App/state/actions'
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

const setUserAvatarProps = ({pictureUrl, gender, fieldsComplete}) => {

  let src = pictureUrl
  let showAlert = false
  let showBorder = true

  if (!pictureUrl && !fieldsComplete) {
    src = '/assets/icons/plus.svg'
    showBorder = false
  } else if (pictureUrl && !fieldsComplete) {
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
    <div className={style.nodeWrapper} onClick={onSelect.bind(null, data.id)}>
      <Avatar size={sizing[size]} { ...setUserAvatarProps(data) } />
    </div>
    <span style={{display: 'block', marginTop: '2px', fontSize: '1em'}}>
      {data.title}
    </span>
  </div>

const SubmitTreeUi = ({modalData, onNodeSelect, progress, treeData: {
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

      <AncestorBlock data={user} size='lg' onSelect={onNodeSelect} />

      <X justify='space-between' style={{width: '100%'}}>
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
      <div style={{width: '100%'}}>
        <h4>Matching Confidence</h4>
        <Progress percent={progress} height='25px' />
      </div>

      <span>Add more information about your family to better match</span>

      <Btn copy='See Your Relation' theme='rust' style={{padding: '15px', width: '60%'}} />

      <TrumpConnection avatarSrc={user.pictureUrl} size='small'/>
    </Y>
    <Footer />
  </div>

SubmitTreeUi.propTypes = {}

/**
 * 1. add 1 to the total because we can have have 100% confidence
 */
const calculateProgress = (treeData) => {
  const treeNodes = Object.keys(treeData)
  const progress = treeNodes
    .reduce((prev, curr) =>
      prev + Number(treeData[curr].fieldsComplete),
    0) / (treeNodes.length + 1)
  return progress * 100
}

const SubmitTree = React.createClass({

  propTypes: {
    treeData: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  },

  getInitialState () {
    return {
      modalIsOpen: false,
      currentNode: ''
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

  render () {
    const { props, state, onNodeSelect, onNodeUpdate, onFormClose } = this
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

    return <SubmitTreeUi { ...{ modalData, onNodeSelect, treeData, progress } } />
  }
})

export default connect(({treeData}) => ({
  treeData
}))(SubmitTree)
