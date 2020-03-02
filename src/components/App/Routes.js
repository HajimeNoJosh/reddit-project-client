import React, { useState, Fragment, useEffect } from 'react'
import { SessionContext } from './Session.js'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Body from '../Body/Body'
import SignOut from '../SignOut/SignOut'
import CreatePost from '../Body/CreatePost'
import Post from '../Body/Post'
import UnAuthPost from '../Body/UnAuthPost'
import { Route, useLocation, useHistory, Switch, withRouter } from 'react-router-dom'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Routes = (props) => {
  const [show, setShow] = useState(false)
  const [showPost, setShowPost] = useState(false)
  const [showUnAuthPost, setShowUnAuthPost] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [posts, setPosts] = useState()
  const [home, setHome] = useState(false)
  const [create, setCreate] = useState(false)
  const history = useHistory()
  const [alerts, setAlerts] = useState([])

  const makeAlert = ({ heading, message, variant }) => {
    setAlerts([...alerts, { heading, message, variant }])
  }
  const handleClose = () => {
    setShow(false)
    setShowPost(false)
    setShowUnAuthPost(false)
    background && history.push({
      pathname: background.pathname,
      state: {
        voteType: 1
      }
    })
  }

  const handleShow = () => setShow(true)

  const handleShowPost = () => setShowPost(true)
  const handleShowUnAuthPost = () => setShowUnAuthPost(true)

  // set post vote from modal (post id, type) {
  // update posts => find post by post id & upvote/downvote depending on type
  // }

  const setPostVote = (postid, type) => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === postid) {
        if (type === 'destroy upvote') {
          posts[i].upvoteUsers.splice(posts[i].upvoteUsers.findIndex(x => x === props.session.id), 1)
        } else if (type === 'add upvote') {
          posts[i].upvoteUsers.push(props.session.id)
        } else if (type === 'add upvote destroy downvote') {
          posts[i].upvoteUsers.push(props.session.id)
          posts[i].downvoteUsers.splice(posts[i].downvoteUsers.findIndex(x => x === props.session.id), 1)
        } else if (type === 'destroy downvote') {
          posts[i].downvoteUsers.splice(posts[i].downvoteUsers.findIndex(x => x === props.session.id), 1)
        } else if (type === 'add downvote destroy upvote') {
          posts[i].downvoteUsers.push(props.session.id)
          posts[i].upvoteUsers.splice(posts[i].upvoteUsers.findIndex(x => x === props.session.id), 1)
        } else if (type === 'add downvote') {
          posts[i].downvoteUsers.push(props.session.id)
        }
      }
    }
    setPosts(posts)
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/posts/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setPosts(res.data.posts)
      })
      .then(setDeleted(false))
      .then(setHome(false))
      .then(setCreate(false))
      .catch(console.error)
  }, [deleted, home, create])

  // Delete request for said post

  const destroy = (id) => {
    axios({
      url: `${apiUrl}/posts/` + id,
      method: 'DELETE',
      headers: { 'Authorization': `Token token=${props.session.token}` }
    })
      .then(() => setDeleted(true))
      .then(makeAlert({
        heading: 'You deleted a post',
        message: 'This post was deleted',
        variant: 'success'

      }))
      .catch(() => makeAlert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }
  const location = useLocation()

  const background = location.state && location.state.background
  return (
    <SessionContext.Provider value={props.session}>
      <Fragment>
        <Header setHome={setHome} user={props.session} alert={makeAlert} show={show} handleClose={handleClose} handleShow={handleShow} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main>
          <Switch location={background || location }>
            <Route user={props.session} path='/sign-out' render={() => (
              <SignOut handleClose={handleClose} alert={makeAlert} user={props.session} />
            )} />
            <Route user={props.session} exact path='/' render={() => (
              <Body
                background={background}
                alert={makeAlert}
                setDeleted={setDeleted}
                setPostVote={setPostVote}
                posts={posts}
                deleted={deleted}
                showPost={showPost}
                showUnAuthPost={showUnAuthPost}
                handleClose={handleClose}
                handleShowUnAuthPost={handleShowUnAuthPost}
                handleShowPost={handleShowPost}
                user={props.session} />
            )} />
            <AuthenticatedRoute user={props.session} path='/Create-Post' render={() => (
              <CreatePost setCreate={setCreate} alert={makeAlert} history={history} user={props.session} />
            )} />
            {props.session && posts && <AuthenticatedRoute user={props.session} exact path='/comments/:id/:title' render={() => (
              <Post
                deleted={deleted}
                destroy={destroy}
                alert={makeAlert}
                user={props.session}
                posts={posts}
                setPostVote={setPostVote} />
            )} />}
          </Switch>
          {background && <Route exact path="/comments/:id/:title" render={() => (
            <ModalTemplate show={showUnAuthPost} handleClose={handleClose} handleShow={handleShowUnAuthPost}>
              <UnAuthPost posts={posts} alert={makeAlert} />
            </ModalTemplate>
          )} />}
          {background && <AuthenticatedRoute user={props.session} exact path="/comments/:id/:title" render={() => (
            <ModalTemplate show={showPost} handleClose={handleClose} handleShow={handleShowPost}>
              <Post
                show={showPost}
                setPostVote={setPostVote}
                deleted={deleted}
                destroy={destroy}
                alert={makeAlert}
                posts={posts}
                user={props.session} />
            </ModalTemplate>
          )} />}
        </main>

      </Fragment>
    </SessionContext.Provider>
  )
}
export default withRouter(Routes)
