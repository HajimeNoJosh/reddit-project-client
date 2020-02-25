import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import Cookies from 'js-cookie'

class SignOut extends Component {
  componentDidMount () {
    const { alert, user, handleClose, history } = this.props

    signOut(user)
      .finally(() => alert({
        heading: 'Signed Out Successfully',
        messagE: messages.signOutSuccess,
        variant: 'success'
      }))
      .finally(() => Cookies.remove('session'))
      .finally(() => handleClose())
      .finally(() => history.push('/'))
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
