import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

const CommentInputEdit = ({ user,
  commentText,
  handleSubmitEdit,
  handleChangeEdit,
  handleCloseEdit,
  handleSetCommentTextValueEdit,
  id,
  alert,
  history,
  match }) => {
  return (
    <Fragment>
      <form onSubmit={handleSubmitEdit}>
        <textarea
          required
          name="text"
          type="text"
          placeholder="Text"
          rows="3"
          value={commentText}
          className="form-control"
          onChange={handleChangeEdit}
        />

        <button
          className="buttoninfo"
        >
        Edit
        </button>
      </form>
    </Fragment>
  )
}

export default withRouter(CommentInputEdit)
