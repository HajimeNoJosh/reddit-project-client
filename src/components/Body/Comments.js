import React, { } from 'react'
import { withRouter } from 'react-router-dom'
import CommentInputEdit from './CommentInputEdit'
import ArrowsComments from './ArrowsComments'

const Comments = (props) => {
  let commentJsx = ''
  if (!props.comments) {
    commentJsx = 'loading...'
  } else {
    commentJsx = props.comments.map(comment => {
      return (
        <div key={comment.id}>
          {props.user.id && <div>
            <ArrowsComments user={props.user} alert={props.alert} id={comment.id} />
          </div>}
          {props.commentId !== comment.id && <p>{comment.text}</p>}
          {props.userId === comment.owner && props.showEdit && props.commentId === comment.id && <CommentInputEdit
            handleCloseEdit={props.handleCloseEdit}
            commentText={props.commentTextValueEdit}
            id={comment.id}
            alert={props.alert}
            user={props.user}
            handleSubmitEdit={props.handleSubmitEdit}
            handleChangeEdit={props.handleChangeEdit}
          />}
          {props.userId === comment.owner && props.commentId !== comment.id && <button className='btn btn-priamry' onClick={() => props.handleShowEdit(comment.id, comment.text)}> Edit </button>}
          {props.userId === comment.owner && !props.showEdit && <button className='btn btn-danger' onClick={() => props.destroyComment(comment.id)}> Delete </button>}
          <hr />
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
