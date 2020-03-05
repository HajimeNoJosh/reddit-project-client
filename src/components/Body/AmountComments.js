import React from 'react'
import { withRouter } from 'react-router-dom'

const AmountComments = (props) => {
  return (
    <div className='postinfo'>
      {props.amount} comments
    </div>
  )
}

export default withRouter(AmountComments)
