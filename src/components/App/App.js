import React, { useState, useEffect } from 'react'
import { getSessionCookie } from './Session.js'
import Routes from './Routes'
import { withRouter } from 'react-router-dom'

const App = (props) => {
  const [session, setSession] = useState(getSessionCookie())
  useEffect(() => {
    const newSessionCookie = getSessionCookie()
    if (newSessionCookie.id !== session.id) {
      setSession(getSessionCookie())
    }
  }, [session])

  return (
    <Routes setSession={setSession} session={session} />
  )
}

export default withRouter(App)
