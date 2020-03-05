import React, { Fragment, useContext } from 'react'
import Posts from './Posts'
import UnAuthPosts from './UnAuthPosts'
import SideBar from './SideBar'
import { withRouter } from 'react-router-dom'
import { SessionContext } from '../App/Session.js'
import ModalTemplate from '../ModalTemplate/ModalTemplate'

const Body = ({ user,
  background,
  setDeleted,
  alert,
  deleted,
  history,
  showPost,
  match,
  handleClose,
  showUnAuthPost,
  handleShowPost,
  handleShowUnAuthPost,
  setPostVote,
  posts,
  amount,
  show,
  handleShow,
  setCommentAmount,
  switchModalType,
  modalType,
  openModal
}) => {
  const session = useContext(SessionContext)

  if (session.token === undefined) {
    return (
      <Fragment>
        <div className='mainbody'>
          <div className='posts-body'>
            <UnAuthPosts show={showUnAuthPost} handleClose={handleClose} handleShow={handleShowUnAuthPost} />
          </div>
          <ModalTemplate title={modalType} show={show} handleClose={handleClose} handleShow={handleShow}>
            {switchModalType(modalType)}
          </ModalTemplate>
          <SideBar show={true} title='This is Gohan' gohan='Gohan is a good boy' gohan2='Gohan likes new members' howtoplease='Brighten his day by joining us' button={<button onClick={() => openModal('Sign Up', true)} className="button-medium button-small">join</button>} />
        </div>

      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className='mainbody'>
          <div className='posts-body'>
            <Posts
              background={background}
              alert={alert}
              posts={posts}
              setPostVote={setPostVote}
              deleted={deleted}
              setDeleted={setDeleted}
              show={showPost}
              handleClose={handleClose}
              handleShow={handleShowPost}
              user={user}
              amount={amount}
              setCommentAmount={setCommentAmount} />
          </div>
          <SideBar show={true} title='Gohan is happy to see you' button={<button className="button-medium button-small">Give Gohan a treat</button>}/>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Body)
