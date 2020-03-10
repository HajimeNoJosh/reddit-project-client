import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'

import Form from 'react-bootstrap/Form'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { history, user } = this.props

    changePassword(this.state, user)
      .then(() => this.props.handleClose())
      .then(() => history.push('/'))
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <div className='mainsignin'>
        <div className='sidebarchangepassword'>
          <h3> Change Password </h3>
          <Form onSubmit={this.onChangePassword}>
            <Form.Group controlId="oldPassword">
              <Form.Control
                required
                name="oldPassword"
                value={oldPassword}
                type="password"
                placeholder="Old Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Control
                required
                name="newPassword"
                value={newPassword}
                type="password"
                placeholder="New Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <button
              className='button-small'
            >
              Submit
            </button>
          </Form>
        </div>
        <div className="sidebarmain">
          <div className='signinsidebarfirst'>
            <div className='infoforfirst'>
              <h2 className="title">Let me fetch a new password for you!</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePassword)
