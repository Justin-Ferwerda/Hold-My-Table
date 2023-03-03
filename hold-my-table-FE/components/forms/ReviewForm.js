import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { createReview } from '../../utils/data/api/reviewData';
import StarRating from '../utility/StarRating';

export default function ReviewForm({ user, table }) {
  const [rating, setRating] = useState({ rating: 0 });
  const [formData, setFormData] = useState({
    user: user.id,
    table,
  });
  const [image, setImage] = useState();
  const router = useRouter();

  const handleRating = (e) => {
    const name = 'rating';
    const value = e;
    setRating((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      setImage(base64ImageString);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview({ ...formData, ...rating, image }).then(() => {
      router.push('/');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <StarRating rating={rating} readonly={false} handleRating={handleRating} />

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload an Image of your Table!</Form.Label>
        <Form.Control type="file" name="image" value={formData.image} onChange={createImageString} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>How was your experience?</Form.Label>
        <Form.Control as="textarea" rows={3} name="content" value={formData.content} onChange={handleChange} />
      </Form.Group>
      <Button type="submit" variant="contained">Add Review</Button>
    </Form>
  );
}

ReviewForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  table: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
