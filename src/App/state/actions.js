export const CALL_API = 'CALL_API'

export const callApi = (config) => ({ [CALL_API]: config })

export const UPDATE_TREE_NODE = 'UPDATE_TREE_NODE'

export const updateTreeNode = (nodeName, data) => ({
  type: UPDATE_TREE_NODE,
  payload: {
    nodeName,
    data
  }
})
