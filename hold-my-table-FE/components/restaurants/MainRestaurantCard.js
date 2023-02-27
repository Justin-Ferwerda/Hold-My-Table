/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import StarRating from '../utility/StarRating';

export default function MainRestaurantCard({ restaurant, src }) {
  return (
    <div className="all-restaurants-card">
      <Card className="text-center restaurant-card">
        <img className="card-img-top" src={src} />
        <Card.Body className="restaurant-card-body">
          <Card.Text>{restaurant.name}</Card.Text>
          <div className="card-star-rating">
            <StarRating rating={restaurant.rating} />
          </div>
          <Card.Text>{restaurant?.style?.label} </Card.Text>
          <Card.Text>{restaurant.priceTier}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

MainRestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    style: PropTypes.shape({
      label: PropTypes.string,
    }),
    priceTier: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  src: PropTypes.string.isRequired,
};
