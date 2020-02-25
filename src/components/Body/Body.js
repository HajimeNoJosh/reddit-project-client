import React, { Fragment, useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import Posts from './Posts'
import UnAuthPosts from './UnAuthPosts'
import { withRouter } from 'react-router-dom'
import { SessionContext } from '../App/Session.js'

const Body = ({ user, setDeleted, alert, deleted, history, showPost, match, handleClose, showUnAuthPost, handleShowPost, handleShowUnAuthPost }) => {
  const session = useContext(SessionContext)

  if (session.token === undefined) {
    return (
      <Fragment>
        <div>
          <UnAuthPosts show={showUnAuthPost} handleClose={handleClose} handleShow={handleShowUnAuthPost} />
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div>
          <Nav.Link href="#/Create-Post" className="btn btn-primary">Create A Post</Nav.Link>
        </div>
        <div>
          <Posts alert={alert} deleted={deleted} setDeleted={setDeleted} show={showPost} handleClose={handleClose} handleShow={handleShowPost} user={user} />
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Body)
