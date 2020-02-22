import React, { useState, Fragment } from 'react'

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

const App = (props) => {
  const [user, setUser] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [show, setShow] = useState(false)
  const [showPost, setShowPost] = useState(false)
  const [showUnAuthPost, setShowUnAuthPost] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const history = useHistory()

  const handleClose = () => {
    setShow(false)
    setShowPost(false)
    setShowUnAuthPost(false)
    background && history.goBack()
  }

  const handleShow = () => setShow(true)

  const handleShowPost = () => setShowPost(true)
  const handleShowUnAuthPost = () => setShowUnAuthPost(true)

  const setAUser = user => setUser(user)

  const clearUser = () => setUser(null)

  const makeAlert = ({ heading, message, variant }) => {
    setAlerts([...alerts, { heading, message, variant }])
  }

  // Delete request for said post

  const destroy = (id) => {
    axios({
      url: `${apiUrl}/posts/` + id,
      method: 'DELETE',
      headers: { 'Authorization': `Token token=${user.token}` }
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
    <Fragment>
      <Header user={user} setUser={setAUser} alert={makeAlert} show={show} handleClose={handleClose} handleShow={handleShow} />
      {alerts.map((alert, index) => (
        <AutoDismissAlert
          key={index}
          heading={alert.heading}
          variant={alert.variant}
          message={alert.message}
        />
      ))}
      <main className="container">
        <Switch location={background || location}>
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut handleClose={handleClose} alert={makeAlert} clearUser={clearUser} user={user} />
          )} />
          <Route user={user} exact path='/' render={() => (
            <Body alert={makeAlert} setDeleted={setDeleted} deleted={deleted} showPost={showPost} showUnAuthPost={showUnAuthPost} handleClose={handleClose} handleShowUnAuthPost={handleShowUnAuthPost} handleShowPost={handleShowPost} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/Create-Post' render={() => (
            <CreatePost alert={makeAlert} history={history} user={user} />
          )} />
          {user && <AuthenticatedRoute user={user} exact path='/comments/:id/:title' render={() => (
            <Post deleted={deleted} destroy={destroy} alert={makeAlert} user={user} />
          )} /> }
          <Route path='/comments/:id/:title' render={() => (
            <UnAuthPost alert={makeAlert} />
          )} />
        </Switch>
        {background && <Route path="/comments/:id/:title" render={() => (
          <ModalTemplate show={showUnAuthPost} handleClose={handleClose} handleShow={handleShowUnAuthPost}>
            <UnAuthPost alert={makeAlert} />
          </ModalTemplate>
        )} />}
        {background && user && <AuthenticatedRoute user={user} path="/comments/:id/:title" render={() => (
          <ModalTemplate show={showPost} handleClose={handleClose} handleShow={handleShowPost}>
            <Post deleted={deleted} destroy={destroy} alert={makeAlert} user={user} />
          </ModalTemplate>
        )} />}
      </main>
    </Fragment>
  )
}

export default withRouter(App)
