import React, { } from 'react'
import { withRouter } from 'react-router-dom'
import ArrowsComments from './ArrowsComments'
const moment = require('moment')

const UnAuthComments = (props) => {
  let commentJsx = ''
  if (!props.comments) {
    commentJsx = 'loading...'
  } else {
    commentJsx = props.comments.map(comment => {
      return (
        <div className='postmain' key={comment.id}>
          <ArrowsComments alert={props.alert} id={comment.id} />
          <div className='posts'>
            <div className='postedinfo'>
              Posted by {comment.email} {moment(comment.createdAt).fromNow()}
            </div>
            <div className='posttitle'> {props.commentId !== comment.id && <p>{comment.text}</p>}</div>
            <div className='postinfo'>
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

export default withRouter(UnAuthComments)
