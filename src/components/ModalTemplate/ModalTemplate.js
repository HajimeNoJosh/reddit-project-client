import { Modal } from 'react-bootstrap'
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

const ModalTemplate = ({ show, handleClose, handleShow, title, children, match }, props) => {
  return (
    <Fragment>
      <Modal size="lg" show={show} onHide={handleClose} animation={false}>
        <div className='modal-title'>
          <div onClick={handleClose}>X Close</div>
        </div>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}

export default withRouter(ModalTemplate)
