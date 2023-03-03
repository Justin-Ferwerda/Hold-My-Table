/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';
import ReviewForm from '../forms/ReviewForm';

export default function ReviewModal({
  user, table,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="contained" onClick={handleShow}>Add Review</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title><h4 className="text-black mt-5">Add Review</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body className="tracklist-modal">
          <ReviewForm user={user} table={table} />
        </Modal.Body>
      </Modal>
    </>
  );
}

ReviewModal.propTypes = {
  table: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
