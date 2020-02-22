import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Posts from './Posts'
import UnAuthPosts from './UnAuthPosts'
import { withRouter } from 'react-router-dom'

const Body = ({ user, setDeleted, alert, deleted, showPost, match, handleClose, showUnAuthPost, handleShowPost, handleShowUnAuthPost }) => {
  if (!user) {
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
