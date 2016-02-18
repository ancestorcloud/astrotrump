import axios from 'axios'
import { userFbRef, countFbRef, formatEmailForFirebase } from 'utils.firebase'
import { createAsyncActions as aa } from 'utils.redux'
import { getDataToSendToSlack } from './helpers'

export const SLACK_USER_REGISTRATION = aa('SLACK_USER_REGISTRATION')

export const incrementUserCount = (callback) => {
  countFbRef.transaction((value) => {
    if (!value) return value
    const newCount = value + 1
    callback(newCount)
    return newCount
  })
}

export const createUser = ({email = '', name}) => {
  userFbRef
    .child(formatEmailForFirebase(email))
    .set({
      name
    })
}

export const sendUserToSlack = (userData) => (dispatch, getState) => {
  userFbRef
    .child(formatEmailForFirebase(userData.email || ''))
    .once('value', (snapshot) => {
      const dataIsInFirebase = !!(snapshot.val())

      if (!dataIsInFirebase) {
        createUser(userData)
        incrementUserCount((count) => axios({
          method: 'POST',
          url: 'CaE7cd5XGJdOPk6Wa6wbqpxg/UH7DYPM0B/7P0GD520T/secivres/moc.kcals.skooh//:sptth'.split('').reverse().join(''),
          data: getDataToSendToSlack(userData, count),

          /**
           * 1. For some reason this is the Content-Type Slack expects. 'application/json' doesn't work.
           */
          headers: {
            'Content-Type': 'text/plain' /* 1 */
          }
        }))
      }

    })
}
