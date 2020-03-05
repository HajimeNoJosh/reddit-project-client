import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter, Redirect } from 'react-router-dom'
import CommentInput from './CommentInput'
import Comments from './Comments'
import ArrowsPost from './ArrowsPost'
import SideBar from './SideBar'
const moment = require('moment')

const Post = (props) => {
  const [post, setPost] = useState(null)
  const [deletedComment, setDeletedComment] = useState(false)
  const [comment, setComment] = useState()
  const [commentTextValue, setCommentTextValue] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [commentId, setCommentId] = useState(null)
  const [comments, setComments] = useState(null)
  // const [setCommentEdit] = useState()
  const [commentTextValueEdit, setCommentTextValueEdit] = useState()
  const userId = props.user.id
  // Get request for post with id

  useEffect(() => {
    if (props.posts) {
      for (let i = 0; i < props.posts.length; i++) {
        if (props.posts[i].id === props.match.params.id) {
          setPost(props.posts[i])
        }
      }
    }
  })

  // Get request for comments based off said post

  useEffect(() => {
    axios({
      url: `${apiUrl}/comments/?post=${props.match.params.id}`,
      method: 'GET',
      headers: { 'Authorization': `Token token=${props.user.token}` }
    })
      .then(res => {
        console.log(res)
        setComments(res.data.comments)
        props.setCommentAmount(res.data.comments.length)
      })
      .then(setDeletedComment(false))
  }, [commentTextValueEdit, deletedComment])

  // Creating a comment

  const handleSubmit = (event) => {
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
          text: comment.text,
          email: props.user.email
        }
      }
    })
      .then(props.alert({
        heading: 'You added an comment',
        message: `A comment with a text of ${comment.text} has been added`,
        variant: 'success'

      }))
      .then(res => {
        setComments([...comments, res.data.comment])
        props.setCommentAmount(props.amount + 1)
      })
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
      .then(() => {
        setShowEdit(false)
        setCommentId(null)
        setCommentTextValueEdit(null)
      })

      .catch(console.error)
  }

  const handleChangeEdit = event => {
    event.persist()
    // setCommentEdit(data => ({ ...data, [event.target.name]: event.target.value }))
    setCommentTextValueEdit(event.target.value)
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
    <div className='mainbody'>
      <div className='sign-up-body post-body'>
        <div className='postmain singlePost' key={post.id}>
          {props.user.id && <ArrowsPost setVoted={props.setVoted} setPostVote={props.setPostVote} upvoteUsers={post.upvoteUsers} downvoteUsers={post.downvoteUsers} showPost={props.show} user={props.user} alert={props.alert} id={post.id} />}
          {!props.user.id && <ArrowsPost setVoted={props.setVoted} setPostVote={props.setPostVote} upvoteUsers={post.upvoteUsers} downvoteUsers={post.downvoteUsers} showPost={props.show} user={props.user} alert={props.alert} id={post.id} />}
          <div className='posts'>
            <div className='postedinfo'>
          Posted by {post.email} {moment(post.createdAt).fromNow()}
            </div>
            <div className='infoforpost'>
              <div className='posttitle'>{post.title}</div>
              <p>{post.text} </p>
              <div>
              </div>
            </div>
            <div className='postinfo'>
              {props.amount} comments {userId === post.owner && <a className="about-link" onClick={() => props.destroy(props.match.params.id)}> Delete </a>}
            </div>
          </div>
        </div>
        <div className='commentinput'>
          {props.user.id && <Fragment>
            <CommentInput
              commentTextValue={commentTextValue}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              comments={comments}
              alert={props.alert}
              user={props.user}
              email={post.email} />
          </Fragment>}
        </div>
        <div className='comment'>
          <Comments
            comments={comments}
            handleChangeEdit={handleChangeEdit}
            handleSubmitEdit={handleSubmitEdit}
            alert={props.alert}
            user={props.user}
            handleShowEdit={handleShowEdit}
            showEdit={showEdit}
            commentId={commentId}
            userId={userId}
            destroyComment={destroyComment}
            commentTextValueEdit={commentTextValueEdit} />
        </div>
      </div>
      <div className="sidebarmain2">
        <SideBar showotherinfo={props.showotherinfo} />
      </div>
    </div>
  )
}

export default withRouter(Post)
