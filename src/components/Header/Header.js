import React, { Fragment, useContext, useState } from 'react'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import ChangePassword from '../ChangePassword/ChangePassword'
import Post from '../Body/Post'
import { SessionContext } from '../App/Session.js'

const Header = (props) => {
  const [modalType, setModalType] = useState(null)
  const session = useContext(SessionContext)

  const openModal = (type, handleShow) => {
    setModalType(type)
    handleShow && props.handleShow()
  }

  const switchModalType = (type) => {
    switch (type) {
    case 'Sign Up':
      return <SignUp modalType={openModal} handleClose={props.handleClose} setUser={props.setUser} alert={props.alert} />
    case 'Sign In':
      return <SignIn modalType={openModal} handleClose={props.handleClose} setUser={props.setUser} alert={props.alert} />
    case 'Change Password':
      return <ChangePassword handleClose={props.handleClose} alert={props.alert} user={props.user} />
    default:
      return <Post handleClose={props.handleClose} alert={props.alert} user={props.user} />
    }
  }

  const authenticatedOptions = (
    <div className='unauth'>
      { session.token && <span className="whitecolorbutton" >Welcome, {session.email}</span>}
      <button className="whitecolorbutton" onClick={() => openModal('Change Password', true)}>Change Password</button>
      <a className="orangebutton" href="#sign-out">Sign Out</a>
    </div>
  )
  // function takes in string typeName
  // switch check what is type name === signUp return sign up etc...
  // always options have ModalTemplate with function inside that does this switch
  const unauthenticatedOptions = (
    <div className='unauth'>
      <button className='whitecolorbutton' onClick={() => openModal('Sign In', true)}>Sign In</button>
      <button className='orangebutton' onClick={() => openModal('Sign Up', true)}>Sign Up</button>
    </div>
  )

  const alwaysOptions = (
    <Fragment>
      <a className='hajimedit' href="#">
      hajimedit
      </a>
      <ModalTemplate title={modalType} show={props.show} handleClose={props.handleClose} handleShow={props.handleShow}>
        {switchModalType(modalType)}
      </ModalTemplate>
    </Fragment>
  )

  return (
    <Fragment>
      <header className='header'>
        { alwaysOptions }
        { session.token ? authenticatedOptions : unauthenticatedOptions }
      </header>
    </Fragment>
  )
}

export default Header
