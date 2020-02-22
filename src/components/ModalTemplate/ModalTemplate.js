import { Modal, Button } from 'react-bootstrap'
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

const ModalTemplate = ({ show, handleClose, handleShow, title, children, match }, props) => {
  const titleToUse = title || match.params.title
  return (
    <Fragment>
      <Modal size="xl" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{titleToUse}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default withRouter(ModalTemplate)
