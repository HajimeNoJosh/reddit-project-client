import { Modal, Button } from 'react-bootstrap'
import React, { Fragment } from 'react'

const ModalTemplate = ({ show, handleClose, handleShow, buttonName, children }) => {
  return (
    <Fragment>
      <Button variant="primary" onClick={handleShow}> {buttonName} </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{buttonName}</Modal.Title>
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

export default ModalTemplate
