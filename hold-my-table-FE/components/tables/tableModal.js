/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';
import Button from '@mui/material/Button';
import StarRating from '../StarRating';

export default function TableModal({ show, handleClose, table }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{table.restaurant.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="tracklist-modal">
          {/* <Image src={table.restaurant.banner_pic} /> */}
          <StarRating rating={table.rating} />
          <Link href={`/reviews/${table.id}`} passHref>
            <div className="review-counter">
              ({table.reviews.length}) review{table.reviews.length > 1 ? 's' : ''}
            </div>
          </Link>
          {!table.isReserved ? <Button variant="contained" className="book-btn">Book Now</Button> : <div />}
        </Modal.Body>
      </Modal>
    </>
  );
}

TableModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  table: PropTypes.shape({
    id: PropTypes.number,
    restaurant: PropTypes.shape({
      name: PropTypes.string,
      banner_pic: PropTypes.string,
    }).isRequired,
    rating: PropTypes.number,
    reviews: PropTypes.shape([]).isRequired,
  }).isRequired,
};
