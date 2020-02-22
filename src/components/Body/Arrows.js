import React, { Fragment, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Arrows = ({ user, setDeleted, id, alert, deleted, showPost, match, handleClose, showUnAuthPost, handleShowPost, handleShowUnAuthPost }) => {
  const [upvotes, setUpvotes] = useState(null)
  const [increment, setIncrement] = useState(false)
  const [upvoteUsers, setUpvoteUsers] = useState(null)
  const [statusToThumb] = useState(true)

  useEffect(() => {
    axios({
      url: `${apiUrl}/posts/` + id,
      method: 'GET',
      headers: { 'Authorization': `Token token=${user.token}` }
    })
      .then(alert({
        heading: 'You got a post',
        message: 'This is a post',
        variant: 'success'

      }))
      .then(res => setUpvotes(res.data.post.upvote))
      .then(res => console.log(res))
      .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
    axios({
      url: `${apiUrl}/posts/` + id,
      method: 'GET',
      headers: { 'Authorization': `Token token=${user.token}` }
    })
      .then(alert({
        heading: 'You got a post',
        message: 'This is a post',
        variant: 'success'

      }))
      .then(res => setUpvoteUsers(res.data.post.upvoteUsers))
      .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }, [])

  const pushedIncrement = () => {
    setIncrement(true)
    setUpvotes(prevState => {
      return prevState + 1
    })
    setUpvoteUsers(upvoteUsers => ({ ...upvoteUsers, user: user._id }))
  }
  const pushedDecrement = () => {
    setIncrement(true)
    setUpvotes(prevState => {
      return prevState - 1
    })
    setUpvoteUsers(upvoteUsers => ({ ...upvoteUsers, user: user._id }))
  }
  console.log(upvoteUsers)
  // if (upvoteUsers && upvoteUsers.includes(() => user.id)) {
  //   setStatusToThumb(false)
  // }

  if (increment) {
    axios({
      url: `${apiUrl}/posts/` + id,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${user.token}`,
        'Content-Type': 'application/json'
      },
      data: {
        post: {
          upvote: upvotes,
          upvoteUsers: upvoteUsers
        }
      }
    })
      .then(alert({
        heading: 'You have thumbed it up',
        message: 'A post has been liked!!!',
        variant: 'success'
      }))
      .then(setIncrement(false))
      .catch(console.error)
  }

  if (!user) {
    return (
      <Fragment>
        <div>
          Thumb Up
        </div>
        <div>
          Thumb down
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        {statusToThumb && <button onClick={pushedIncrement}>
          Thumb Up
        </button>}
        {upvotes}
        <button onClick={pushedDecrement}>
          Thumb down
        </button>
      </Fragment>
    )
  }
}

export default withRouter(Arrows)
