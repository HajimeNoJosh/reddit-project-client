import React, { Fragment } from 'react'
import { useLocation, Link } from 'react-router-dom'
import ArrowsPost from './ArrowsPost'
const moment = require('moment')

const Posts = ({ user,
  alert,
  background,
  showPost,
  setDeleted,
  show,
  deleted,
  match,
  handleClose,
  handleShow,
  posts,
  setPostVote,
  setCommentAmount
}) => {
  const location = useLocation()

  let postJsx = ''
  if (!posts) {
    postJsx = 'loading...'
  } else {
    postJsx = posts.map(post => {
      return (
        <div className='postmain' key={post.id}>
          <ArrowsPost setPostVote={setPostVote} upvoteUsers={post.upvoteUsers} downvoteUsers={post.downvoteUsers} showPost={show} user={user} alert={alert} id={post.id} />
          <div className='posts'>
            <div className='postedinfo'>
            Posted by {post.email} {moment(post.createdAt).fromNow()}
            </div>
            <Link className='infoforpost' to={ { pathname: `/comments/${post.id}/${post.title}`, state: { background: location } } } onClick={() => handleShow()} >

              <div className='posttitle'>{post.title}</div>
              <div className='postinfo'>
                {post.amount} comments
              </div>
            </Link>
          </div>
        </div>
      )
    })
  }

  return (
    <Fragment>
      {postJsx}
    </Fragment>
  )
}

export default Posts
