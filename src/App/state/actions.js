import axios from 'axios'
import Firebase from 'firebase'
import { buildCreateIndividualQueryParams, formatEmailForFirebase } from './actions.utils.js'

const fbRef = new Firebase('https://astrotrump.firebaseio.com/users')

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

const trimTree = ({father, mother, mFather, mMother, pFather, pMother}) => ({
  father: father.data,
  mother: mother.data,
  mFather: mFather.data,
  mMother: mMother.data,
  pFather: pFather.data,
  pMother: pMother.data
})

export const captureData = (treeData) => (dispatch, getState) => {

  const { user } = getState().session

  if (user.email) {
    fbRef.child(formatEmailForFirebase(user.email)).set({
      name: user.name,
      treeData: trimTree(treeData)
    })
  }

}

export const findRelation = (treeData) => (dispatch, getState) => {

  const sessionId = 'fakeid'

  /**
   * creating and array of axios get requests for each individual we need
   * to create in the ogf DB
   * 1. turning treedData object into an array
   * 2. transforming treeNode state used by UI into data object to be used as params
   * expected by ogf.
   * 3. id is needed to track which node member the data belongs to
   * 4. creating axios.get functions with bound data to be called in a promise.all
   * 5. use id to match returned data with the ogf id returned from individual api call
   */
  const createIndividualRequests = Object.keys(treeData)
    .map((nodeName) => treeData[nodeName]) /* [1] */
    // .filter() maybe filter out incomplete nodes
    .map(({data, gender, id}) => ({ /* [2] */
      id, /* [3] */
      ...buildCreateIndividualQueryParams(sessionId, {
        ...data,
        gender
      })
    }))
    .map(({id, ...params}) => axios.get.bind(null, '/', { /* [4] */
      baseUrl: 'http://wsdev.onegreatfamily.com/v11.02/Individual.svc/CreateUpdate',
      params,
      transformResponse: [(data) => ({ /* [5] */
        ...data, // assumes axios transforms response from xml to js object. this could be totally false.
        id
      })]
    }))

  axios.all(createIndividualRequests.map(apiCall => apiCall()))
  .then(axios.spread((...responses) => {
  }))

  return {
  }

}
  // do client side validations on treeData
  // if not enough, dispatch error state

  /* http://wsdev.onegreatfamily.com/v11.02/Individual.svc/CreateUpdate?
    [ ]SessionId=gl4q23cwofpshi55sg1dvc3o&
    IndiOgfn=123456&
    [ ]Name=John/Smith&
    [ ]Gender=Male&
    [ ]BirthDate=Jan 1 1900&
    [ ]BirthPlace=Phoenix,Arizona,USA&&
    ChristeningDate=Feb 1 1900&
    ChristeningPlace=Phoenix,ArizonaUSA&
    DeathDate=Feb 6 1960&
    DeathPlace=Phoenix,ArizonaUSA&
    BurialDate=Feb 13 1960&
    BurialPlace=Phoenix,ArizonaUSA&
    Email=johns@gone.com&
    lockId=12666600
  */