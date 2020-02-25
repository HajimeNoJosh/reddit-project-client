import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const ArrowsComments = ({ user, setDeleted, id, alert, deleted, showPost, match, handleClose, showUnAuthPost, handleShowPost, handleShowUnAuthPost }) => {
  const [upvotes, setUpvotes] = useState()
  const [downvotes, setDownvotes] = useState()
  const [voted, setVoted] = useState(false)

  const pushedIncrement = () => {
    axios({
      url: `${apiUrl}/upvotecomments`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${user.token}`,
        'Content-Type': 'application/json'
      },
      data: {
        upvotecomment: {
          comment_id: id
        }
      }
    })
      .then(() => alert({
        heading: 'You have thumbed it up',
        message: 'A post has been liked!!!',
        variant: 'success'
      }))
      .then(() => setVoted(true))
      .catch(() => {
        for (let i = 0; i < upvotes.length; i++) {
          if (upvotes[i].owner === user.id) {
            axios({
              url: `${apiUrl}/upvotecomments/` + upvotes[i]._id,
              method: 'DELETE',
              headers: { 'Authorization': `Token token=${user.token}` }
            })
              .then(() => setVoted(true))
              .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
          }
        }
      })
    for (let i = 0; i < downvotes.length; i++) {
      if (downvotes[i].owner === user.id) {
        axios({
          url: `${apiUrl}/downvotecomments/` + downvotes[i]._id,
          method: 'DELETE',
          headers: { 'Authorization': `Token token=${user.token}` }
        })
          .then(() => alert({
            heading: 'You have thumbed it up',
            message: 'A post has been liked!!!',
            variant: 'success'
          }))
          .catch(() => alert({
            heading: 'You where unable to thumb up this post',
            message: 'Likely you have already voted for this post',
            variant: 'danger'
          }))
      }
    }
  }

  const pushedDecrement = () => {
    axios({
      url: `${apiUrl}/downvotecomments`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${user.token}`,
        'Content-Type': 'application/json'
      },
      data: {
        downvotecomment: {
          comment_id: id
        }
      }
    })
      .then(() => setVoted(true))
      .then(() => alert({
        heading: 'You have thumbed it down',
        message: 'A post has been liked!!!',
        variant: 'success'
      }))
      .catch(() => {
        for (let i = 0; i < downvotes.length; i++) {
          if (downvotes[i].owner === user.id) {
            axios({
              url: `${apiUrl}/downvotecomments/` + downvotes[i]._id,
              method: 'DELETE',
              headers: { 'Authorization': `Token token=${user.token}` }
            })
              .then(() => setVoted(true))
              .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
          }
        }
      })
    for (let i = 0; i < upvotes.length; i++) {
      if (upvotes[i].owner === user.id) {
        axios({
          url: `${apiUrl}/upvotecomments/` + upvotes[i]._id,
          method: 'DELETE',
          headers: { 'Authorization': `Token token=${user.token}` }
        })
          .then(() => alert({
            heading: 'You have thumbed it down',
            message: 'A post has been liked!!!',
            variant: 'success'
          }))
          .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
      }
    }
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/upvotecomments/?comment=${id}`,
      method: 'GET',
      headers: { 'Authorization': `Token token=${user.token}` }
    })
      .then(res => setUpvotes(res.data.upvotecomments))
      .then(() => setVoted(false))
      .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' })
      )
  }, [voted])
  useEffect(() => {
    axios({
      url: `${apiUrl}/downvotecomments/?comment=${id}`,
      method: 'GET',
      headers: { 'Authorization': `Token token=${user.token}` }
    })
      .then(res => setDownvotes(res.data.downvotecomments))
      .then(() => setVoted(false))
      .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' })
      )
  }, [voted])

  let howMany = ''
  if (upvotes && downvotes) {
    howMany = parseInt(upvotes.length) - parseInt(downvotes.length)
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
        <button onClick={() => pushedIncrement()}>
          Thumb Up
        </button>
        {upvotes && downvotes && <div>{howMany}</div>}
        <button onClick={() => pushedDecrement()}>
          Thumb down
        </button>
      </Fragment>
    )
  }
}

export default withRouter(ArrowsComments)
