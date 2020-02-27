import React, { useState, Fragment } from 'react'
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
  const history = useHistory()
  const [alerts, setAlerts] = useState([])

  const makeAlert = ({ heading, message, variant }) => {
    setAlerts([...alerts, { heading, message, variant }])
  }
  const handleClose = () => {
    setShow(false)
    setShowPost(false)
    setShowUnAuthPost(false)
    background && history.goBack()
  }

  const handleShow = () => setShow(true)

  const handleShowPost = () => setShowPost(true)
  const handleShowUnAuthPost = () => setShowUnAuthPost(true)

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
        <Header user={props.session} alert={makeAlert} show={show} handleClose={handleClose} handleShow={handleShow} />
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
              <Body alert={makeAlert} setDeleted={setDeleted} deleted={deleted} showPost={showPost} showUnAuthPost={showUnAuthPost} handleClose={handleClose} handleShowUnAuthPost={handleShowUnAuthPost} handleShowPost={handleShowPost} user={props.session} />
            )} />
            <AuthenticatedRoute user={props.session} path='/Create-Post' render={() => (
              <CreatePost alert={makeAlert} history={history} user={props.session} />
            )} />
            {props.session && <AuthenticatedRoute user={props.session} exact path='/comments/:id/:title' render={() => (
              <Post deleted={deleted} destroy={destroy} alert={makeAlert} user={props.session} />
            )} />}
          </Switch>
          {background && <Route exact path="/comments/:id/:title" render={() => (
            <ModalTemplate show={showUnAuthPost} handleClose={handleClose} handleShow={handleShowUnAuthPost}>
              <UnAuthPost alert={makeAlert} />
            </ModalTemplate>
          )} />}
          {background && <AuthenticatedRoute user={props.session} exact path="/comments/:id/:title" render={() => (
            <ModalTemplate show={showPost} handleClose={handleClose} handleShow={handleShowPost}>
              <Post deleted={deleted} destroy={destroy} alert={makeAlert} user={props.session} />
            </ModalTemplate>
          )} />}
        </main>

      </Fragment>
    </SessionContext.Provider>
  )
}
export default withRouter(Routes)
