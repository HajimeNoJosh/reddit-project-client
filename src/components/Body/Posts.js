import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { useLocation, Link } from 'react-router-dom'
import Arrows from './Arrows'

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
      .then(res => setPost(res.data.posts))
      .then(setDeleted(false))
      .catch(console.error)
  }, [deleted])

  const location = useLocation()

  let postJsx = ''
  if (!post) {
    postJsx = 'loading...'
  } else {
    postJsx = post.map(post => (
      <div key={post.id} >
        <Link to={ { pathname: `/comments/${post.id}/${post.title}`, state: { background: location } } } onClick={() => handleShow()}>
          <h1>{post.title}</h1>
        </Link>
        <Arrows user={user} alert={alert} id={post.id} />
      </div>
    ))
  }

  return (
    <Fragment>
      {postJsx}
    </Fragment>
  )
}

export default Posts
