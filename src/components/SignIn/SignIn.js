import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import { setSessionCookie } from '../App/Session.js'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()
    const { alert } = this.props

    signIn(this.state)
      .then(res => {
        setSessionCookie({ token: res.data.user.token, id: res.data.user._id, email: res.data.user.email })
      })
      .then(() => alert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => this.props.handleClose())
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert({
          heading: 'Sign In Failed',
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className='mainsignin'>
        <div className='sidebarsignin'>
          <h3> Log in </h3>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
              <Form.Control
                required
                type="text"
                name="email"
                value={email}
                placeholder="Enter Username"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <button
              className='button-small'
            >
              Submit
            </button>
            <div>Don&apos;t have an account yet? <a className='about-link' onClick={() => this.props.modalType('Sign Up')} >Sign up now!</a></div>
          </Form>
        </div>
        <div className="sidebarmain">
          <div className='sidebarfirst'>
            <div className='infoforfirst'>
              <h2 className="title">Bark! Bark!</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
