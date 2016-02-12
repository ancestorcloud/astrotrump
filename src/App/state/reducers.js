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

const extractFbData = (user, data) => ({
  pictureUrl: user.picture.data.url,
  data: {
    ...data,
    birthday: user.birthday || ''
  }
})

const relationDataReducer = relation => (state, { payload: user }) => {
  const relationData = findRelationshipData(relation, user.family.data)
  console.log(state, relation)
  if (!relationData) return state

  return {
    ...state,
    ...extractFbData(relationData, state.data)
  }
}

const fieldsAreComplete = (data) => data.fullName && data.birthday && data.location

const initialDefaultState = {
  fieldsComplete: false,
  pictureUrl: '',
  data: {
    fullName: '',
    birthday: '',
    location: ''
  }
}

export const user = createReducer({
  id: 'user',
  title: '',
  gender: '',
  ...initialDefaultState
}, {

  [USER_UPDATE_FACEBOOK_DATA]: (state, { payload: user }) => ({
    ...state,
    title: user.name,
    gender: user.gender,
    ...extractFbData(user, state.data)
  }),

  // [UPDATE_TREE_NODE]: (state, { payload: { nodeName, data }}) =>

})

export const father = createReducer({
  id: 'father',
  title: 'Father',
  gender: 'male',
  ...initialDefaultState
}, {
  [UPDATE_TREE_NODE]: (state, { payload: { nodeName, data } }) => {
    console.log(nodeName, state.id)
    if (nodeName !== state.id) return state

    return {
      ...state,
      fieldsComplete: fieldsAreComplete(data),
      data: {
        ...state,
        ...data
      }
    }
  }

  // [USER_UPDATE_FACEBOOK_DATA]: (state, { payload: user }) => relationDataReducer('father')
})

export const mother = createReducer({
  id: 'mother',
  title: 'Mother',
  gender: 'female',
  ...initialDefaultState
}, {
  // [USER_UPDATE_FACEBOOK_DATA]: (state, { payload: user }) => relationDataReducer('mother')
})

export const pFather = createReducer({
  id: 'pFather',
  title: 'Paternal Grandfather',
  gender: 'male',
  ...initialDefaultState
}, {

})

export const pMother = createReducer({
  id: 'pMother',
  title: 'Paternal Grandmother',
  gender: 'female',
  ...initialDefaultState
}, {

})

export const mFather = createReducer({
  id: 'mFather',
  title: 'Maternal Grandfather',
  gender: 'female',
  ...initialDefaultState
}, {

})

export const mMother = createReducer({
  id: 'pMother',
  title: 'Maternal Grandmother',
  gender: 'male',
  ...initialDefaultState
}, {

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
