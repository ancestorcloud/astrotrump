import { combineReducers } from 'redux'
import { createReducer } from 'utils.redux'
import {
  UPDATE_TREE_NODE,
  OGF_RESULTS,
  OGF_RESULTS_SUCCESS,
  OGF_RESULTS_FAILURE
} from './actions'
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

export const ogfResults = createReducer({}, {

  [OGF_RESULTS]: (state, { payload: { isFetching } }) => ({
    ...state,
    isFetching
  }),

  [OGF_RESULTS_SUCCESS]: (state, { payload: { degrees, isFetching } }) => ({
    ...state,
    degrees,
    isFetching
  }),

  [OGF_RESULTS_FAILURE]: (state, { payload: { isFetching } }) => ({
    ...state,
    isFetching
  })

})

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
  title: `Father's Father`,
  gender: 'male',
  ...initialDefaultState
}, {
  [UPDATE_TREE_NODE]: updateTreeNode
})

export const pMother = createReducer({
  id: 'pMother',
  title: `Father's Mother`,
  gender: 'female',
  ...initialDefaultState
}, {
  [UPDATE_TREE_NODE]: updateTreeNode
})

export const mFather = createReducer({
  id: 'mFather',
  title: `Mother's Father`,
  gender: 'male',
  ...initialDefaultState
}, {
  [UPDATE_TREE_NODE]: updateTreeNode

})

export const mMother = createReducer({
  id: 'mMother',
  title: `Mother's Mother`,
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
