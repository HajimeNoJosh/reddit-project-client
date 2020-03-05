import React, { } from 'react'
import { withRouter } from 'react-router-dom'
import CommentInputEdit from './CommentInputEdit'
import ArrowsComments from './ArrowsComments'
const moment = require('moment')

const Comments = (props) => {
  let commentJsx = ''
  if (!props.comments) {
    commentJsx = 'loading...'
  } else {
    commentJsx = props.comments.map(comment => {
      return (
        <div className='postmaincomment' key={comment.id}>
          <ArrowsComments upvoteUsers={comment.upvoteUsers} downvoteUsers={comment.downvoteUsers} user={props.user} alert={props.alert} id={comment.id} />
          <div className='comments'>
            <div className='postedinfo'>
              Posted by {comment.email} {moment(comment.createdAt).fromNow()}
            </div>
            <div className='posttitle'> {props.commentId !== comment.id && <p className='commenttext'>{comment.text}</p>}</div>
            <div className='postinfo'>
              {props.userId === comment.owner && props.showEdit && props.commentId === comment.id && <CommentInputEdit
                handleCloseEdit={props.handleCloseEdit}
                commentText={props.commentTextValueEdit}
                id={comment.id}
                alert={props.alert}
                user={props.user}
                handleSubmitEdit={props.handleSubmitEdit}
                handleChangeEdit={props.handleChangeEdit}
              />}
              {props.userId === comment.owner && props.commentId !== comment.id && <button className='buttoninfo' onClick={() => props.handleShowEdit(comment.id, comment.text)}> Edit </button>}
              {props.userId === comment.owner && !props.showEdit && <button className='buttoninfo' onClick={() => props.destroyComment(comment.id, props.amount)}> Delete </button>}
            </div>
          </div>
        </div>
      )
    })
  }
  if (!props.comments) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {commentJsx}
    </div>
  )
}

export default withRouter(Comments)
