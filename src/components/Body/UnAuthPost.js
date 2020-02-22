import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import UnAuthComments from './UnAuthComments'

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
  }, [])

  useEffect(() => {
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
  }, [])

  if (!post) {
    return <p>Loading...</p>
  }
  // Clear input field on Submit
  // Move delete and move edit to here and do similar to line 85

  return (
    <div>
      <p className='center postsplayedtitle'>{post.text}</p>
      <UnAuthComments comments={comments} alert={props.alert} />
    </div>
  )
}

export default withRouter(UnAuthPost)
