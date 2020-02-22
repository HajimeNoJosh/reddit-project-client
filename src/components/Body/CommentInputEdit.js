import React, { Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Form onSubmit={handleSubmitEdit}>
            <Form.Group controlId="text">
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
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={handleCloseEdit}
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  )
}

export default withRouter(CommentInputEdit)
