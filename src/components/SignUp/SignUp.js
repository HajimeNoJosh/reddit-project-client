import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'

import Form from 'react-bootstrap/Form'
import { setSessionCookie } from '../App/Session.js'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => {
        this.props.setSession({ token: res.data.user.token, id: res.data.user._id, email: res.data.user.email })
        setSessionCookie({ token: res.data.user.token, id: res.data.user._id, email: res.data.user.email })
      })
      .then(() => this.props.handleClose())
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <div className='mainsignup'>
        <div >
          <div className='signupsidebarfirst'>
            <div className='infoforfirst'>
              <h2 className="titlelogin">Come on in!</h2>
              <h2 className='titlelogin'>We have dog treats to share </h2>
            </div>
          </div>
        </div>
        <div className='sidebarsignup'>
          <h3> Sign Up </h3>
          <Form onSubmit={this.onSignUp}>
            <Form.Group controlId="signup-email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="text"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="singup-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <button
              className='button-small'
            >
              Submit
            </button>
            <div>Have an account already? <a className='about-link' onClick={() => this.props.modalType('Sign In')} >Sign In now!</a></div>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
