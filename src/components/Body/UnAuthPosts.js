import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { useLocation, Link } from 'react-router-dom'

const UnAuthPosts = ({ alert, show, handleClose, handleShow }) => {
  const [post, setPost] = useState(null)
  useEffect(() => {
    axios({
      url: `${apiUrl}/posts/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => setPost(res.data.posts))
      .catch(console.error)
    return () => {
      setPost(null)
    }
  }, [])
  const unAuthLocation = useLocation()
  let postJsx = ''
  if (!post) {
    postJsx = 'loading...'
  } else {
    postJsx = post.map(post => (
      <Link to={ { pathname: `/comments/${post.id}/${post.title}`, state: { background: unAuthLocation } } } onClick={() => handleShow()} key={post.id} >
        <h1>{post.title}</h1>
      </Link>
    ))
  }

  return (
    <Fragment>
      {postJsx}
    </Fragment>
  )
}

export default UnAuthPosts
