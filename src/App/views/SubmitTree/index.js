import style from './style'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateTreeNode } from 'App/state/actions'
import { Y, X } from 'obj.Layout'
import Btn from 'atm.Btn'
import Avatar from 'atm.Avatar'
import Tree from './components/Tree'
import NodeInputModal from './components/NodeInputModal'

const sizing = {
  sm: '60',
  md: '70',
  lg: '80'
}

const determineDefault = (gender) => (gender === 'male' || gender === 'female')
  ? `/assets/icons/${gender}.svg`
  : `/assets/icons/male.svg`

const setUserAvatar = (url, gender) => url
  ? url
  : determineDefault(gender)

const AncestorBlock = ({ data, onSelect, size }) =>
  <div style={{textAlign: 'center', maxWidth: sizing[size]}}>
    <div onClick={onSelect.bind(null, data.id)}>
      <Avatar size={sizing[size]} src={setUserAvatar(data.pictureUrl, data.gender)} />
    </div>
    <span style={{display: 'block', marginTop: '2px', fontSize: '.5em'}}>
      {data.title}
    </span>
  </div>

const SubmitTreeUi = ({modalData, onNodeSelect, treeData: {
  user,
  father,
  mother,
  pFather,
  pMother,
  mFather,
  mMother
}}) =>
  <div className={style.root}>
    <NodeInputModal { ...modalData } />
    <header className={style.header}>
      <div className={style.banner}>
        <img src='/images/stars.svg' />
      </div>
      <h1 className={style.h1}>Add Your Family</h1>
    </header>
    <Y y className={style.tree}>

      <AncestorBlock data={user} size='lg' onSelect={onNodeSelect}
      />

      <div style={{textAlign: 'center'}}>
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
      </div>
    </Y>
    <Y y tag='footer'>
      <Btn copy='See Your Relation' theme='rust' />
    </Y>
  </div>

SubmitTreeUi.propTypes = {}

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
    const nodeData = treeData[currentNode]
    const modalData = {
      modalIsOpen,
      nodeTitle: nodeData && nodeData.title,
      formData: nodeData,
      onFormClose,
      onNodeUpdate
    }

    return <SubmitTreeUi { ...{ modalData, onNodeSelect, treeData } } />
  }
})

export default connect(({treeData}) => ({
  treeData
}))(SubmitTree)
