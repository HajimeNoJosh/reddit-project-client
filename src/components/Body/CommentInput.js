import React, { Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'

const CommentInput = ({ user, handleSubmit, commentTextValue, handleChange, history, match }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="text">
              <textarea
                required
                name="text"
                type="text"
                placeholder="Text"
                rows="3"
                className="form-control"
                value={commentTextValue}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Create
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  )
}

export default withRouter(CommentInput)
