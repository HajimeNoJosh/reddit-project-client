import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const ArrowsComment = ({ user, background, setCommentVote, upvoteUsers, downvoteUsers, id, alert, deleted, showComment, match, handleClose, showUnAuthComment, handleShowComment, handleShowUnAuthComment }) => {
  const [votes, setVotes] = useState()
  const [upvote, setUpVote] = useState('')
  const [downvote, setDownVote] = useState('')
  const [voted, setVoted] = useState(false)

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
  }, [voted])

  if (!user || Object.entries(user).length === 0) {
    return (
      <div className='votingcomment singlePost'>
        <div className='arrowrect' />
        <button className='votebuttons' disabled>
          <div className="voteup"></div>
        </button>
        <div className='commentvotes'>{votes}</div>
        <button className='votebuttons' disabled>
          <div className="votedown"></div>
        </button>
      </div>
    )
  } else {
    // upvote means it has been voted up voteup means it hasn't same pattern for downvote

    const pushedIncrement = () => {
      axios({
        url: `${apiUrl}/comments/vote/${id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Token token=${user.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          comment: {
            user: user.id,
            status: 1
          }
        }
      })
        .then(setVoted(true))
        .then(function (res) {
          if (res.data.type === 'getridofupvote') {
            setVotes(votes - 1)
            setUpVote('voteup')
          } else if (res.data.type === 'getridofdownvoteandaddupvote') {
            setVotes(votes + 2)
            setUpVote('upvote')
            setDownVote('votedown')
          } else if (res.data.type === 'addupvote') {
            setVotes(votes + 1)
            setUpVote('upvote')
          }
        })
    }
    const pushedDecrement = () => {
      axios({
        url: `${apiUrl}/comments/vote/${id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Token token=${user.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          comment: {
            user: user.id,
            status: 2
          }
        }
      })
        .then(setVoted(true))
        .then(function (res) {
          if (res.data.type === 'getridofdownvote') {
            setVotes(votes + 1)
            setDownVote('votedown')
          } else if (res.data.type === 'getridofupvoteandadddownvote') {
            setVotes(votes - 2)
            setDownVote('downvote')
            setUpVote('voteup')
          } else if (res.data.type === 'adddownvote') {
            setVotes(votes - 1)
            setDownVote('downvote')
          }
        })
    }

    return (
      <div className='votingcomment singlePost'>
        <div className='arrowrect' />
        <button className='votebuttons' onClick={() => pushedIncrement()}>
          <div className={upvote + ' upvoteButton'}></div>
        </button>
        <div className='commentvotes'>{votes}</div>
        <button className='votebuttons' onClick={() => pushedDecrement()}>
          <div className={downvote + ' downvoteButton'}></div>
        </button>
      </div>
    )
  }
}

export default withRouter(ArrowsComment)
