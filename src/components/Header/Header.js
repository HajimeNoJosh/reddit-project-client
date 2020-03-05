import React, { Fragment, useContext } from 'react'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import { SessionContext } from '../App/Session.js'
import Gohan from '../Body/Gohan'
import { withRouter } from 'react-router-dom'

const Header = (props) => {
  const session = useContext(SessionContext)

  const authenticatedOptions = (
    <div className='unauth'>
      <button className='orangebutton' onClick={() => props.history.push('/create-post')}>Create Post </button>
      <div className="dropdown">
        <button className="dropbtn votebuttons">{ session.token && <span className="whitecolorbutton" >Welcome, {session.email}</span> }
        </button>
        <div className="dropdown-content">
          <button className="whitecolorbutton" onClick={() => props.openModal('Change Password', true)}>Change Password</button>
          <button className="whitecolorbutton" onClick={() => props.history.push('sign-out')}>Sign Out</button>
        </div>
      </div>
    </div>
  )
  // function takes in string typeName
  // switch check what is type name === signUp return sign up etc...
  // always options have ModalTemplate with function inside that does this switch
  const unauthenticatedOptions = (
    <div className='unauth'>
      <button className='whitecolorbutton' onClick={() => props.openModal('Sign In', true)}>Sign In</button>
      <button className='orangebutton' onClick={() => props.openModal('Sign Up', true)}>Sign Up</button>
    </div>
  )

  const alwaysOptions = (
    <Fragment>
      <a className='hajimedit' href="#" onClick={() => props.setHome(true)}>
        <Gohan aria-label='gohan' />
      hajimeddit
      </a>
      <ModalTemplate title={props.modalType} show={props.show} handleClose={props.handleClose} handleShow={props.handleShow}>
        {props.switchModalType(props.modalType)}
      </ModalTemplate>
    </Fragment>
  )

  return (
    <Fragment>
      <div className='alignheader'>
        <header className='header'>
          { alwaysOptions }
          { session.token ? authenticatedOptions : unauthenticatedOptions }
        </header>
      </div>
    </Fragment>
  )
}

export default withRouter(Header)
