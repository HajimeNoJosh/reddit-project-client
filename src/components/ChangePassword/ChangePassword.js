import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

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

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert({
        heading: 'Change Password Success',
        message: messages.changePasswordSuccess,
        variant: 'success'
      }))
      .then(() => this.props.handleClose())
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        alert({
          heading: 'Change Password Failed',
          message: messages.changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <div className='mainsignin'>
        <div className='sidebarchangepassword'>
          <h3> Change Password </h3>
          <Form onSubmit={this.onChangePassword}>
            <Form.Group controlId="oldPassword">
              <Form.Label>Old password</Form.Label>
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
              <Form.Label>New Password</Form.Label>
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
