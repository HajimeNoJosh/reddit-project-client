import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const ArrowsPost = ({ user, background, setVoted, setPostVote, upvoteUsers, downvoteUsers, id, alert, deleted, showPost, match, handleClose, showUnAuthPost, handleShowPost, handleShowUnAuthPost }) => {
  const [votes, setVotes] = useState()
  const [upvote, setUpVote] = useState('')
  const [downvote, setDownVote] = useState('')

  useEffect(() => {
    if (upvoteUsers && downvoteUsers && user) {
      setVotes(parseInt(upvoteUsers.length) - parseInt(downvoteUsers.length))
      if (downvoteUsers.includes(user.id)) {
        setUpVote('voteup')
        setDownVote('downvote')
      } else {
        setDownVote('votedown')
      }
      if (upvoteUsers.includes(user.id)) {
        setUpVote('upvote')
        setDownVote('votedown')
      } else {
        setUpVote('voteup')
      }
    } else if (!user) {
      setVotes(parseInt(upvoteUsers.length) - parseInt(downvoteUsers.length))
    }
  })
  if (!user || Object.entries(user).length === 0) {
    return (
      <div className='voting'>
        <div className='arrowrect' />
        <button className='votebuttons' disabled>
          <div className="voteup"></div>
        </button>
        {votes}
        <button className='votebuttons' disabled>
          <div className="votedown"></div>
        </button>
      </div>
    )
  } else {
    // upvote means it has been voted up voteup means it hasn't same pattern for downvote

    const pushedIncrement = () => {
      axios({
        url: `${apiUrl}/posts/vote/${id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Token token=${user.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          post: {
            user: user.id,
            status: 1
          }
        }
      })
        .then(function (res) {
          if (res.data.type === 'getridofupvote') {
            setVotes(votes - 1)
            setUpVote('voteup')
            setPostVote(id, 'destroy upvote')
          } else if (res.data.type === 'getridofdownvoteandaddupvote') {
            setVotes(votes + 2)
            setUpVote('upvote')
            setDownVote('votedown')
            setPostVote(id, 'add upvote destroy downvote')
          } else if (res.data.type === 'addupvote') {
            setVotes(votes + 1)
            setUpVote('upvote')
            setPostVote(id, 'add upvote')
          }
        })
      //
    }
    const pushedDecrement = () => {
      axios({
        url: `${apiUrl}/posts/vote/${id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Token token=${user.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          post: {
            user: user.id,
            status: 2
          }
        }
      })
        .then(function (res) {
          if (res.data.type === 'getridofdownvote') {
            setVotes(votes + 1)
            setDownVote('votedown')
            setPostVote(id, 'destroy downvote')
          } else if (res.data.type === 'getridofupvoteandadddownvote') {
            setVotes(votes - 2)
            setDownVote('downvote')
            setUpVote('voteup')
            setPostVote(id, 'add downvote destroy upvote')
          } else if (res.data.type === 'adddownvote') {
            setVotes(votes - 1)
            setDownVote('downvote')
            setPostVote(id, 'add downvote')
          }
        })
    }

    return (
      <div className='voting'>
        <div className='arrowrect' />
        <button className='votebuttons' onClick={() => pushedIncrement()}>
          <div className={upvote}></div>
        </button>
        <div>{votes}</div>
        <button className='votebuttons' onClick={() => pushedDecrement()}>
          <div className={downvote}></div>
        </button>
      </div>
    )
  }
}

export default withRouter(ArrowsPost)
