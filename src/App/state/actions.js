import axios from 'axios'
import zipWith from 'lodash.zipwith'
import { createAsyncActions as aa } from 'utils.redux'
import Bluebird from 'bluebird'
import {
  buildCreateIndividualQueryParams,
  filterIncompleteNodes
} from './actions.utils.js'
import { userFbRef, formatEmailForFirebase } from 'utils.firebase'

export const [
  OGF_RESULTS,
  OGF_RESULTS_SUCCESS,
  OGF_RESULTS_FAILURE
] = aa('OGF_RESULTS')

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
    userFbRef
      .child(formatEmailForFirebase(user.email))
      .child('treeData')
      .set(trimTree(treeData))
  }

}

export const findRelation = (treeData) => (dispatch, getState) => {

  const { session: { ogfSessionId } } = getState()
  const trump = '577114544'

  if (!ogfSessionId) {
    dispatch(failureResult)
    return {}
  }

  dispatch(beginResult)

  const url = 'https://ws.onegreatfamily.com/v11.02/Individual.svc/CreateUpdate'

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
  const flattendTree = Object.keys(treeData)
    .map((nodeName) => treeData[nodeName]) /* [1] */
    .filter(filterIncompleteNodes)
    .map(({data, gender, id}) => ({ /* [2] */
      id, /* [3] */
      ...buildCreateIndividualQueryParams(ogfSessionId, {
        ...data,
        gender
      })
    }))

  const requests = flattendTree
    .map(({id, ...params}) => axios.get(url, { /* [4] */
      params
    }))

  axios
  .all(requests)
  .then(responses => responses.map(validateResponse))
  .then(ogfnids => zipWith(ogfnids, flattendTree, zipperHelper))
  .then(individuals => {
    return addRelationships(ogfSessionId, individuals)
    .then(
      () => matchNow(
        ogfSessionId,
        individuals.map(individual => individual.ogfnid)
      )
    )
    .then(validateResponse)
    .then(waitForMatch.bind(null, ogfSessionId))
    .then(() => {
      const me = individuals.find(
        individual => individual.id === 'user'
      )
      return findRelationship(
        ogfSessionId,
        [trump, me.ogfnid]
      )
      .then(validateResponse)
    })
  })
  .then(relationshipResult => {
    const { degrees = 0 } = relationshipResult
    if (degrees === 0) {
      throw new Error('Match Not Found')
    }
    dispatch(successResult(degrees))
  })
  .catch(err => {
    dispatch(failureResult)
  })

  return {
  }

}

function successResult (degrees) {
  return {
    type: OGF_RESULTS_SUCCESS,
    payload: {
      degrees,
      isFetching: false
    }
  }
}

const failureResult = {
  type: OGF_RESULTS_FAILURE,
  payload: {
    isFetching: false
  }
}

const beginResult = {
  type: OGF_RESULTS,
  payload: {
    isFetching: true
  }
}

function findRelationship (sessionId, [indiogfn1, indiogfn2], type='ANY') {

  const url = 'https://ws.onegreatfamily.com/v11.02/Individual.svc/RelationshipFind'

  return axios.get(url, {
    params: {
      sessionId,
      indiogfn1,
      indiogfn2,
      type
    }
  })
  .then(validateResponse)

}

function promiseTimer (delay) {
  return new Bluebird(resolve => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

function waitForMatch (sessionId, jobId) {
  return checkJobStatus(sessionId, jobId)
    .then(validateResponse)
    .then(jobStatus => {
      if (jobStatus.TotalProgress !== 100) {
        return promiseTimer(1000)
          .then(() => waitForMatch(sessionId, jobId))
      } else {
        return jobStatus
      }
    })
}

function checkJobStatus (sessionId, jobId) {

  const url = 'https://ws.onegreatfamily.com/v11.02/Status.svc/MatchStatus'

  return axios.get(url, {
    params: {
      sessionId,
      jobId
    }
  })

}

function addRelationship (sessionId, [indiOgfn, relatedIndiOgfn], type) {

  const url = 'https://ws.onegreatfamily.com/v11.02/Individual.svc/AddIndiAsRelation'

  return axios.get(url, {
    params: {
      sessionId,
      indiOgfn,
      relatedIndiOgfn,
      relationshipType: type
    }
  })

}

function addRelationships (sessionId, individuals) {

  const tree = individuals.reduce(
    (tree, individual) => ({
      ...tree,
      [individual.id]: individual
    }),
    {}
  )

  const {
    user, father, mother, pFather, pMother,
    mFather, mMother
  } = tree

  let relationshipResponses = []

  if (!user) {
    return []
  }

  if (father) {
    relationshipResponses = relationshipResponses.concat(
      addRelationship(
        sessionId,
        [father.ogfnid, user.ogfnid],
        'FATHER_RELATIONSHIP'
      )
    )
    if (pFather) {
      relationshipResponses = relationshipResponses.concat(
        addRelationship(
          sessionId,
          [pFather.ogfnid, father.ogfnid],
          'FATHER_RELATIONSHIP'
        )
      )
    }
    if (pMother) {
      relationshipResponses = relationshipResponses.concat(
        addRelationship(
          sessionId,
          [pMother.ogfnid, father.ogfnid],
          'MOTHER_RELATIONSHIP'
        )
      )
    }
  }

  if (mother) {
    relationshipResponses = relationshipResponses.concat(
      addRelationship(
        sessionId,
        [mother.ogfnid, user.ogfnid],
        'MOTHER_RELATIONSHIP'
      )
    )
    if (mFather) {
      relationshipResponses = relationshipResponses.concat(
        addRelationship(
          sessionId,
          [mFather.ogfnid, mother.ogfnid],
          'FATHER_RELATIONSHIP'
        )
      )
    }
    if (mMother) {
      relationshipResponses = relationshipResponses.concat(
        addRelationship(
          sessionId,
          [mMother.ogfnid, mother.ogfnid],
          'MOTHER_RELATIONSHIP'
        )
      )
    }
  }

  return axios
    .all(relationshipResponses)
    .then(responses => responses.map(validateResponse))

}

function matchNow (sessionId, ogfnids) {

  const url = 'https://ws.onegreatfamily.com/v11.02/Individual.svc/MatchNow'

  return axios.get(url, {
    params: {
      sessionId,
      indiogfns: ogfnids.join(',')
    }
  })

}

function findPerson (id, individual) {
  return id === individual.id
}

function dispatchUpdates (dispatch, individuals) {
  individuals.forEach(individual => {
    const { id, ogfnid } = individual
    dispatch(updateTreeNode(id, { ogfnid }))
  })
  return {}
}

function validateResponse (response) {
  const { Code, Value, Message } = response.data
  if (Code !== 0) {
    throw new Error(Message)
  }
  return Value
}

function zipperHelper (ogfnid, individual) {
  return {
    ...individual,
    ogfnid
  }
}
