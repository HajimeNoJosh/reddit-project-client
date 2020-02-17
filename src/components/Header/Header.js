import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import SignUp from '../SignUp/SignUp'

const Header = (props) => {
  console.log(props)
  const authenticatedOptions = (
    <Fragment>
      <Nav.Link href="#change-password">Change Password</Nav.Link>
      <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    </Fragment>
  )

  const unauthenticatedOptions = (
    <Fragment>
      <ModalTemplate show={props.show} buttonName={'Sign Up'} handleClose={props.handleClose} handleShow={props.handleShow}>
        <SignUp show={props.handleClose} setUser={props.setUser} alert={props.alert}>
        </SignUp>
      </ModalTemplate>
      <Nav.Link href="#sign-in">Sign In</Nav.Link>
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
