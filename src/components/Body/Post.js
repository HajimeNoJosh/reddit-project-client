import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter, Redirect } from 'react-router-dom'
import CommentInput from './CommentInput'
import Comments from './Comments'

const Post = (props) => {
  const [post, setPost] = useState(null)
  const [deletedComment, setDeletedComment] = useState(false)
  const [comments, setComments] = useState(null)
  const [comment, setComment] = useState()
  const [commentTextValue, setCommentTextValue] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [commentId, setCommentId] = useState(null)
  // const [setCommentEdit] = useState()
  const [commentTextValueEdit, setCommentTextValueEdit] = useState()
  const userId = props.user._id

  // Get request for post with id

  useEffect(() => {
    axios({
      url: `${apiUrl}/posts/${props.match.params.id}`,
      method: 'GET',
      headers: { 'Authorization': `Token token=${props.user.token}` }
    })
      .then(props.alert({
        heading: 'You got a post',
        message: 'This is a post',
        variant: 'success'

      }))
      .then(res => setPost(res.data.post))
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }, [])

  // Get request for comments based off said post

  useEffect(() => {
    axios({
      url: `${apiUrl}/comments/?post=${props.match.params.id}`,
      method: 'GET',
      headers: { 'Authorization': `Token token=${props.user.token}` }
    })
      .then(props.alert({
        heading: 'You got a comment',
        message: 'This is a comment',
        variant: 'success'

      }))
      .then(res => setComments(res.data.comments))
      .then(setDeletedComment(false))
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }, [commentTextValueEdit, deletedComment])

  // Creating a comment

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/comments`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`,
        'Content-Type': 'application/json'
      },
      data: {
        comment: {
          post_id: props.match.params.id,
          text: comment.text
        }
      }
    })
      .then(props.alert({
        heading: 'You added an comment',
        message: `A comment with a text of ${comment.text} has been added`,
        variant: 'success'

      }))
      .then(res => setComments([...comments, res.data.comment]))
      .then(setCommentTextValue(''))
      .catch(console.error)
  }

  // Changing the input field for creating a comment
  const handleChange = event => {
    event.persist()
    setComment(data => ({ ...data, [event.target.name]: event.target.value }))
    setCommentTextValue(event.target.value)
  }

  const handleSubmitEdit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/comments/${commentId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`,
        'Content-Type': 'application/json'
      },
      data: {
        comment: {
          post_id: props.match.params.id,
          text: commentTextValueEdit
        }
      }
    })
      .then(props.alert({
        heading: 'You edited an comment',
        message: `A comment with a text of ${commentTextValueEdit} has been edited`,
        variant: 'success'
      }))
      .catch(console.error)
  }

  const handleChangeEdit = event => {
    event.persist()
    // setCommentEdit(data => ({ ...data, [event.target.name]: event.target.value }))
    setCommentTextValueEdit(event.target.value)
  }

  const handleCloseEdit = (id) => {
    setShowEdit(false)
    setCommentId(null)
    setCommentTextValueEdit(null)
  }

  const handleShowEdit = (id, textValue) => {
    setCommentId(id)
    setShowEdit(true)
    setCommentTextValueEdit(textValue)
  }

  const destroyComment = (id) => {
    axios({
      url: `${apiUrl}/comments/${id}`,
      method: 'DELETE',
      headers: { 'Authorization': `Token token=${props.user.token}` }
    })
      .then(props.alert({
        heading: 'You deleted a comment',
        message: 'This comment was deleted',
        variant: 'success'

      }))
      .then(setDeletedComment(true))
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  if (props.deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'Post succesfully deleted!' } }
    } />
  }

  if (!post) {
    return <p>Loading...</p>
  }

  // Move delete and move edit to here and do similar to line 85

  return (
    <div>
      <p className='center postsplayedtitle'>{post.text}</p>
      <hr />
      {userId === post.owner && <button className='btn btn-danger' onClick={() => props.destroy(props.match.params.id)}> Delete </button>}
      <hr />
      Post a comment
      <CommentInput
        commentTextValue={commentTextValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        comments={comments}
        alert={props.alert}
        user={props.user} />
      <hr />
      <Comments
        comments={comments}
        handleChangeEdit={handleChangeEdit}
        handleSubmitEdit={handleSubmitEdit}
        alert={props.alert}
        user={props.user}
        handleShowEdit={handleShowEdit}
        handleCloseEdit={handleCloseEdit}
        showEdit={showEdit}
        commentId={commentId}
        userId={userId}
        destroyComment={destroyComment}
        commentTextValueEdit={commentTextValueEdit} />
    </div>
  )
}

export default withRouter(Post)
