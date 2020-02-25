import React, { Fragment, useContext, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import { Button } from 'react-bootstrap'
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
    <Fragment>
      <Button variant="primary" onClick={() => openModal('Change Password', true)}>Change Password</Button>
      <Nav.Link className="btn btn-primary" href="#sign-out">Sign Out</Nav.Link>
    </Fragment>
  )
  // function takes in string typeName
  // switch check what is type name === signUp return sign up etc...
  // always options have ModalTemplate with function inside that does this switch
  const unauthenticatedOptions = (
    <Fragment>
      <Button variant="primary" onClick={() => openModal('Sign Up', true)}>Sign Up</Button>
      <Button variant="primary" onClick={() => openModal('Sign In', true)}>Sign In</Button>
    </Fragment>
  )

  const alwaysOptions = (
    <Fragment>
      <Nav.Link href="#" className="btn btn-primary">Home</Nav.Link>
      <ModalTemplate title={modalType} show={props.show} handleClose={props.handleClose} handleShow={props.handleShow}>
        {switchModalType(modalType)}
      </ModalTemplate>
    </Fragment>
  )

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Navbar.Brand href="#">
        Hajimedit
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { session.token && <span className="navbar-text mr-2">Welcome, {session.email}</span>}
          { alwaysOptions }
          { session.token ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
