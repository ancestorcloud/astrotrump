import React from 'react'

const getScriptData = (globalName) => window !== 'undefined'
? { [globalName]: typeof window[globalName] !== 'undefined' ? window[globalName] : undefined }
: { [globalName]: undefined }

export const makeAsyncScript = ({
  Component,
  scriptUrl,
  globalName
}) => React.createClass({

  displayName: 'AsyncScriptLoader',

  getInitialState () {
    return {
      ...getScriptData(globalName)
    }
  },

  /**
   * 1. if already loaded
   */
  componentDidMount () {
    if (globalName && typeof window[globalName] !== 'undefined') { /* [1] */
      return this.setScriptState()
    }

    if (!document) return

    let script = document.createElement('script')

    script.src = scriptUrl
    script.async = 1

    script.onload = this.setScriptState

    script.onerror = (event) => {
      console.log(`error while loading ${globalName} script `)
    }

    document.body.appendChild(script)
  },

  setScriptState () {
    this.setState(getScriptData(globalName))
  },

  render () {
    return <Component {...this.props} {...this.state}/>
  }

})
