import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { useLocation, Link } from 'react-router-dom'
import ArrowsPost from './ArrowsPost'
const moment = require('moment')

const Posts = ({ user, alert, setDeleted, show, deleted, match, handleClose, handleShow }) => {
  const [post, setPost] = useState()
  useEffect(() => {
    axios({
      url: `${apiUrl}/posts/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setPost(res.data.posts)
      })
      .then(setDeleted(false))
      .catch(console.error)
  }, [deleted])

  const location = useLocation()

  let postJsx = ''
  if (!post) {
    postJsx = 'loading...'
  } else {
    postJsx = post.map(post => {
      return (
        <div className='postmain' key={post.id}>
          <ArrowsPost showPost={show} user={user} alert={alert} id={post.id} />
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
