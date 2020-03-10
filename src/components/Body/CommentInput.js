import React, { Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'

const CommentInput = ({ user, handleSubmit, amount, email, commentTextValue, handleChange, history, match }) => {
  return (
    <Fragment>

      <div className='comment'>Post a comment as {user.email}</div>
      <Form onSubmit={() => handleSubmit(event, amount)}>
        <Form.Group controlId="text">
          <textarea
            required
            name="text"
            type="text"
            placeholder="Text"
            rows="2"
            className="form-control"
            value={commentTextValue}
            onChange={handleChange}
          />
        </Form.Group>
        <button className="button-medium button-small">
          Create
        </button>
      </Form>
    </Fragment>
  )
}

export default withRouter(CommentInput)
