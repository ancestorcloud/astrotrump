import style from './style'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Y, X } from 'obj.Layout'
import Ancestor from 'atm.Ancestor'
import Tree from './components/Tree'
import NodeInputModal from './components/NodeInputModal'

const AncestorBlock = ({ label= '', onSelect, ...rest }) =>
  <div style={{textAlign: 'center', width: '70px'}}>
    <div onClick={onSelect.bind(null, label)}>
      <Ancestor { ...rest } />
    </div>
    <span style={{display: 'block', marginTop: '2px'}}>
      {label}
    </span>
  </div>

const SubmitTreeUi = ({modalData, onNodeSelect}) =>
  <div>
    <NodeInputModal { ...modalData } />
    <header className={style.header}>
      <h1 className={style.h1}>Add Your Family</h1>
    </header>
    <Y y>
      <Tree
        top={
          <AncestorBlock gender='male' discovered={true} onSelect={onNodeSelect}/>
        }
        left={
          <Tree
            top={<AncestorBlock label='Father' gender='male' discovered={true} onSelect={onNodeSelect}/>}
            left={<AncestorBlock label='Paternal Father' gender='male' discovered={true} onSelect={onNodeSelect}/>}
            right={<AncestorBlock label='Paternal Mother' gender='female' discovered={false} onSelect={onNodeSelect}/>}
          />
        }
        right={
          <Tree
            top={<AncestorBlock label='Mother' gender='female' discovered={true} onSelect={onNodeSelect}/>}
            left={<AncestorBlock label='Maternal Father' gender='male' discovered={true} onSelect={onNodeSelect}/>}
            right={<AncestorBlock label='Maternal Mother' gender='female' discovered={false} onSelect={onNodeSelect}/>}
          />
        }
      />
    </Y>
  </div>

SubmitTreeUi.propTypes = {}

const SubmitTree = React.createClass({

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

    return <SubmitTreeUi { ...{ modalData, onNodeSelect } } />
  }
})

export default connect(state => ({

}))(SubmitTree)
