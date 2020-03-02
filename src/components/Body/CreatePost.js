import React, { Fragment, useState } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'

const CreatePost = ({ user, alert, history, setCreate }) => {
  const [post, setPost] = useState()
  // const [created, setCreated] = useState()

  const handleSubmit = event => {
    event.preventDefault()
    setCreate(true)
    axios({
      url: `${apiUrl}/posts`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${user.token}`,
        'Content-Type': 'application/json'
      },
      data: {
        post: {
          text: post.text,
          title: post.title,
          email: user.email,
          amount: 0,
          upvoteUsers: [user.id],
          downvoteUsers: []
        } }
    })
      .then(alert({
        heading: 'You added an post',
        message: `A post with a title of ${post.title} has been added`,
        variant: 'success'
      }))
      .then(response => {
        history.push(`/comments/${response.data.post.id}/${response.data.post.title}`)
      })
      .catch(console.error)
  }

  const handleChange = event => {
    event.persist()
    setPost(data => ({ ...data, [event.target.name]: event.target.value }))
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Control
                required
                type="title"
                name="title"
                placeholder="Title"
                maxLength="50"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="text">
              <textarea
                required
                name="text"
                type="text"
                placeholder="Text"
                rows="3"
                className="form-control"
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

export default withRouter(CreatePost)
