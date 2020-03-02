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
      .then(props.alert({
        heading: 'You got a post',
        message: 'This is a post',
        variant: 'success'

      }))
      .then(res => setPost(res.data.post))
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
    axios({
      url: `${apiUrl}/comments/?post=${props.match.params.id}`,
      method: 'GET'
    })
      .then(props.alert({
        heading: 'You got a comment',
        message: 'This is a comment',
        variant: 'success'

      }))
      .then(res => setComments(res.data.comments))
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
    return () => {
      setPost(null)
      setComments(null)
    }
  }, [])

  if (!post) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <div className='postmain' key={post.id}>
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
  Comments
      <UnAuthComments comments={comments} alert={props.alert} />
    </div>
  )
}

export default withRouter(UnAuthPost)
