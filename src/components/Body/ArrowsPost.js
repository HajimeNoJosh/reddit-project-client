import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const ArrowsPost = ({ user, setDeleted, id, alert, deleted, showPost, match, handleClose, showUnAuthPost, handleShowPost, handleShowUnAuthPost }) => {
  if (!user) {
    return (
      <div className='voting'>
        <div className='arrowrect' />
        <button className='votebuttons' disabled>
          <div className="voteup"></div>
        </button>
        *
        <button className='votebuttons' disabled>
          <div className="votedown"></div>
        </button>
      </div>

    )
  } else {
    const [upvotes, setUpvotes] = useState()
    const [downvotes, setDownvotes] = useState()
    const [voted, setVoted] = useState(false)
    const [upvote, setUpVote] = useState('voteup')
    const [downvote, setDownVote] = useState('votedown')

    const pushedIncrement = () => {
      axios({
        url: `${apiUrl}/upvotes`,
        method: 'POST',
        headers: {
          'Authorization': `Token token=${user.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          upvote: {
            post_id: id
          }
        }
      })
        .then(() => setUpVote('upvote'))
        .then(() => setDownVote('votedown'))
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
                url: `${apiUrl}/upvotes/` + upvotes[i]._id,
                method: 'DELETE',
                headers: { 'Authorization': `Token token=${user.token}` }
              })
                .then(() => setUpVote('voteup'))
                .then(() => setVoted(true))
                .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
            }
          }
        })
      for (let i = 0; i < downvotes.length; i++) {
        if (downvotes[i].owner === user.id) {
          axios({
            url: `${apiUrl}/downvotes/` + downvotes[i]._id,
            method: 'DELETE',
            headers: { 'Authorization': `Token token=${user.token}` }
          })
            .then(() => setDownVote('votedown'))
            .then(() => setUpVote('upvote'))
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
        url: `${apiUrl}/downvotes`,
        method: 'POST',
        headers: {
          'Authorization': `Token token=${user.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          downvote: {
            post_id: id
          }
        }
      })
        .then(() => setDownVote('downvote'))
        .then(() => setUpVote('voteup'))
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
                url: `${apiUrl}/downvotes/` + downvotes[i]._id,
                method: 'DELETE',
                headers: { 'Authorization': `Token token=${user.token}` }
              })
                .then(() => setDownVote('votedown'))
                .then(() => setVoted(true))
                .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
            }
          }
        })
      for (let i = 0; i < upvotes.length; i++) {
        if (upvotes[i].owner === user.id) {
          axios({
            url: `${apiUrl}/upvotes/` + upvotes[i]._id,
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
        url: `${apiUrl}/upvotes/?post=${id}`,
        method: 'GET',
        headers: { 'Authorization': `Token token=${user.token}` }
      })
        .then(res => setUpvotes(res.data.upvotes))
        .then(() => setVoted(false))
        .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' })
        )
    }, [voted, showPost])
    useEffect(() => {
      axios({
        url: `${apiUrl}/downvotes/?post=${id}`,
        method: 'GET',
        headers: { 'Authorization': `Token token=${user.token}` }
      })
        .then(res => setDownvotes(res.data.downvotes))
        .then(() => setVoted(false))
        .catch(() => alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' })
        )
    }, [voted, showPost])

    let howMany = ''
    if (upvotes && downvotes) {
      howMany = parseInt(upvotes.length) - parseInt(downvotes.length)
    }
    return (
      <div className='voting'>
        <div className='arrowrect' />
        <button className='votebuttons' onClick={() => pushedIncrement()}>
          <div className={upvote}></div>
        </button>
        {upvotes && downvotes && <div>{howMany}</div>}
        <button className='votebuttons' onClick={() => pushedDecrement()}>
          <div className={downvote}></div>
        </button>
      </div>
    )
  }
}

export default withRouter(ArrowsPost)
