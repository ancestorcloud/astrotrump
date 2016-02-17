import { combineReducers } from 'redux'
import { createReducer } from 'utils.redux'
import { UPDATE_TREE_NODE } from './actions'
import {
  USER_UPDATE_FACEBOOK_DATA
} from 'App/state/session/actions'

const findRelationshipData = (relation, data) => {
  let relationData

  data.some((item) => {
    if (item.relationship === relation) {
      relationData = item
      return
    }
  })

  return relationData
}

const extractFbData = ({birthday, name, picture}, data) => ({
  pictureUrl: picture && picture.data && picture.data.url,
  highlightMissingData: true,
  data: {
    ...data,
    birthday: birthday || '',
    fullName: name || ''
  }
})

const relationDataReducer = (state, { payload: user }) => {
  if (!(user && user.family && user.family.data)) return state

  const relationData = findRelationshipData(state.id, user.family.data)

  return !relationData
  ? state
  : {
    ...state,
    ...extractFbData(relationData, state.data)
  }
}

const fieldsAreComplete = (data) => !!(
  data.fullName &&
  data.birthday &&
  data.location
)

const updateTreeNode = (state, { payload: { nodeName, data } }) => (nodeName === state.id)
  ? {
    ...state,
    fieldsComplete: fieldsAreComplete(data),
    data: {
      ...state.data,
      ...data
    }
  }
  : state

const initialDefaultState = {
  fieldsComplete: false,
  highlightMissingData: false,
  pictureUrl: '',
  data: {
    fullName: '',
    birthday: '',
    location: ''
  }
}

export const user = createReducer({
  id: 'user',
  title: 'You',
  gender: '',
  ...initialDefaultState
}, {

  [USER_UPDATE_FACEBOOK_DATA]: (state, { payload: user }) => ({
    ...state,
    gender: user.gender,
    ...extractFbData(user, state.data)
  }),

  [UPDATE_TREE_NODE]: updateTreeNode

})

export const father = createReducer({
  id: 'father',
  title: 'Father',
  gender: 'male',
  ...initialDefaultState
}, {
  [UPDATE_TREE_NODE]: updateTreeNode,

  [USER_UPDATE_FACEBOOK_DATA]: relationDataReducer
})

export const mother = createReducer({
  id: 'mother',
  title: 'Mother',
  gender: 'female',
  ...initialDefaultState
}, {
  [UPDATE_TREE_NODE]: updateTreeNode,

  [USER_UPDATE_FACEBOOK_DATA]: relationDataReducer
})

export const pFather = createReducer({
  id: 'pFather',
  title: `Grandpa`,
  gender: 'male',
  ...initialDefaultState
}, {
  [UPDATE_TREE_NODE]: updateTreeNode
})

export const pMother = createReducer({
  id: 'pMother',
  title: `Grandma`,
  gender: 'female',
  ...initialDefaultState
}, {
  [UPDATE_TREE_NODE]: updateTreeNode
})

export const mFather = createReducer({
  id: 'mFather',
  title: `Grandpa`,
  gender: 'male',
  ...initialDefaultState
}, {
  [UPDATE_TREE_NODE]: updateTreeNode

})

export const mMother = createReducer({
  id: 'mMother',
  title: `Grandma`,
  gender: 'female',
  ...initialDefaultState
}, {
  [UPDATE_TREE_NODE]: updateTreeNode

})

export const treeData = combineReducers({
  user,
  father,
  mother,
  pFather,
  pMother,
  mFather,
  mMother
})
