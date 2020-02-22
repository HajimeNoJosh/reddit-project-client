import React, { } from 'react'
import { withRouter } from 'react-router-dom'

const UnAuthComments = (props) => {
  let commentJsx = ''
  if (!props.comments) {
    commentJsx = 'loading...'
  } else {
    commentJsx = props.comments.map(comment => {
      return (
        <div key={comment.id}>
          <p>{comment.text}</p>
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
