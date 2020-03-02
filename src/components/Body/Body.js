import React, { Fragment, useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import Posts from './Posts'
import UnAuthPosts from './UnAuthPosts'
import { withRouter } from 'react-router-dom'
import { SessionContext } from '../App/Session.js'

const Body = ({ user,
  background,
  setDeleted,
  alert,
  deleted,
  history,
  showPost,
  match,
  handleClose,
  showUnAuthPost,
  handleShowPost,
  handleShowUnAuthPost,
  setPostVote,
  posts
}) => {
  const session = useContext(SessionContext)

  if (session.token === undefined) {
    return (
      <Fragment>
        <div className='mainbody'>
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
        <Posts
          background={background}
          alert={alert}
          posts={posts}
          setPostVote={setPostVote}
          deleted={deleted}
          setDeleted={setDeleted}
          show={showPost}
          handleClose={handleClose}
          handleShow={handleShowPost}
          user={user} />
      </Fragment>
    )
  }
}

export default withRouter(Body)
