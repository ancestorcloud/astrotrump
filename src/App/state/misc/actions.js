import { createAsyncActions as aa } from 'utils.redux'
import { callApi } from 'App/state/actions'
import { getDataToSendToSlack } from './helpers'

export const SLACK_USER_REGISTRATION = aa('SLACK_USER_REGISTRATION')

export const sendUserToSlack = (userData) => callApi({
  method: 'POST',
  types: SLACK_USER_REGISTRATION,
  url: 'https://hooks.slack.com/services/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',
  data: getDataToSendToSlack(userData),

  /**
   * 1. For some reason this is the Content-Type Slack expects. 'application/json' doesn't work.
   */
  headers: {
    'Content-Type': 'text/plain' /* 1 */
  }
})
