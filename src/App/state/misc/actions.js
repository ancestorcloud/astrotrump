import { createAsyncActions as aa } from 'utils.redux'
import { callApi } from 'App/state/actions'
import { getDataToSendToSlack } from './helpers'

export const SLACK_USER_REGISTRATION = aa('SLACK_USER_REGISTRATION')

export const sendUserToSlack = (userData) => callApi({
  method: 'POST',
  types: SLACK_USER_REGISTRATION,
  url: 'CaE7cd5XGJdOPk6Wa6wbqpxg/UH7DYPM0B/7P0GD520T/secivres/moc.kcals.skooh//:sptth'.split('').reverse().join(''),
  data: getDataToSendToSlack(userData),

  /**
   * 1. For some reason this is the Content-Type Slack expects. 'application/json' doesn't work.
   */
  headers: {
    'Content-Type': 'text/plain' /* 1 */
  }
})
