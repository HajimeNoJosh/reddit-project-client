import React, { Component, Fragment } from 'react'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignOut from '../SignOut/SignOut'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      show: false
    }
  }

  handleClose = () => this.setState({ show: false })

  handleShow = () => this.setState({ show: true })

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user, show } = this.state

    return (
      <Fragment>
        <Header user={user} setUser={this.setUser} alert={this.alert} show={show} handleClose={this.handleClose} handleShow={this.handleShow} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut handleClose={this.handleClose} alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
