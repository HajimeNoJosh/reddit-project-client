import React, { Fragment, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import { Button } from 'react-bootstrap'

const Header = (props) => {
  const [modalType, setModalType] = useState('')

  const openModal = (type, handleShow) => {
    setModalType(type)
    handleShow && props.handleShow()
  }

  const authenticatedOptions = (
    <Fragment>
      <Nav.Link href="#change-password">Change Password</Nav.Link>
      <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    </Fragment>
  )
  // function takes in string typeName
  // switch check what is type name === signUp return sign up etc...
  // always options have ModalTemplate with function inside that does this switch
  const unauthenticatedOptions = (
    <Fragment>
      <Button variant="primary" onClick={() => openModal('Sign Up', true)}>Sign Up</Button>
      <Button variant="primary" onClick={() => openModal('Sign In', true)}>Sign In</Button>
      <ModalTemplate title={modalType} show={props.show} handleClose={props.handleClose} handleShow={props.handleShow}>
        { modalType === 'Sign Up'
          ? <SignUp setUser={props.setUser} alert={props.alert} />
          : <SignIn setUser={props.setUser} alert={props.alert} />
        }
      </ModalTemplate>
    </Fragment>
  )

  const alwaysOptions = (
    <Fragment>
      <Nav.Link href="/#">Home</Nav.Link>
    </Fragment>
  )

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Navbar.Brand href="#">
        HajimeNoReddit
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { props.user && <span className="navbar-text mr-2">Welcome, {props.user.email}</span>}
          { alwaysOptions }
          { props.user ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
