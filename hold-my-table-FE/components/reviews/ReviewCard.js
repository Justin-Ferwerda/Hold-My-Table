/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Form,
} from 'react-bootstrap';
import { Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import StarRating from '../utility/StarRating';
import { useAuth } from '../../utils/context/authContext';
import { deleteReview, updateReview } from '../../utils/data/api/reviewData';

export default function ReviewCard({ review, onUpdate }) {
  const [readonly, setReadOnly] = useState(true);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    rating: review.rating,
    content: review.content,
  });

  const deleteThisReview = () => {
    if (window.confirm('Delete Review?')) {
      deleteReview(review.id).then(() => onUpdate());
    }
  };

  const editHandleClick = () => {
    setReadOnly(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const payload = {
        ...formData, id: review.id,
      };
      updateReview(payload).then(() => onUpdate());
      setReadOnly(true);
    }
  };

  const handleContent = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRating = (e) => {
    const name = 'rating';
    const value = e;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="review-card">
      <Card className="text-center" style={{ width: '18rem' }}>
        <img src={`http://127.0.0.1:8000${review.image}`} />
        <Card.Body className="review-card-body">
          <Avatar src={review.user.profile_image_url} />
          <Card.Text>{review.user.first_name} {review.user.last_name}</Card.Text>
          <StarRating rating={review.rating} readonly={readonly} handleRating={handleRating} />
          <Form.Control
            className="review-content"
            readOnly={readonly}
            type="textarea"
            name="content"
            value={formData.content}
            placeholder="content"
            onChange={handleContent}
            onKeyDown={handleKeyDown}
            rows={3}

          />
        </Card.Body>
        {user.id === review?.user?.id ? (
          <>
            <IconButton aria-label="edit" className="edit-btn" onClick={editHandleClick}>
              <EditIcon style={{ color: 'black' }} />
            </IconButton>
            <IconButton aria-label="delete" className="delete-btn " onClick={deleteThisReview}>
              <DeleteIcon style={{ color: 'black' }} />
            </IconButton>
          </>

        ) : (
          <div />
        )}
      </Card>
    </div>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    rating: PropTypes.number,
    content: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      profile_image_url: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};
