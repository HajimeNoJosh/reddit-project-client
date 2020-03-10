import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import UnAuthComments from './UnAuthComments'
import ArrowsPost from './ArrowsPost'
const moment = require('moment')

const UnAuthPost = (props) => {
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/posts/${props.match.params.id}`,
      method: 'GET'
    })
      .then(res => setPost(res.data.post))
    axios({
      url: `${apiUrl}/comments/?post=${props.match.params.id}`,
      method: 'GET'
    })
      .then(res => setComments(res.data.comments))
    return () => {
      setPost(null)
      setComments(null)
    }
  }, [])

  if (!post) {
    return <p>Loading...</p>
  }

  return (
    <div className='mainbody'>
      <div className='sign-up-body post-body post-modal-body'>
        <div className='postmain singlePost' key={post.id}>
          <ArrowsPost upvoteUsers={post.upvoteUsers} downvoteUsers={post.downvoteUsers} showPost={props.show} user={props.user} alert={props.alert} id={post.id} />
          <div className='posts'>
            <div className='postedinfo'>
          Posted by {post.email} {moment(post.createdAt).fromNow()}
            </div>
            <div className='infoforpost'>
              <div className='posttitle'>{post.title}</div>
              <p>{post.text} </p>
            </div>
            <div className='postinfo'>
              {post.amount} comments
            </div>
            <div>
            </div>
          </div>
        </div>
        <UnAuthComments comments={comments} alert={props.alert} />
      </div>
    </div>
  )
}

export default withRouter(UnAuthPost)
