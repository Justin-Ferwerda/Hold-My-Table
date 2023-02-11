/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';

export default function MainRestaurantCard({ restaurant, src }) {
  return (
    <div className="all-restaurants-card">
      <Card className="text-center restaurant-card">
        <img className="card-img-top" src={src} />
        <Card.Body className="restaurant-card-body">
          <div className="starRating">
            <Rating
              allowHover={false}
              size={26}
              allowFraction
              iconsCount={5}
              initialValue={restaurant.rating}
              readonly
              tooltipStyle={{
                height: 'auto', width: 'auto', fontSize: '13px', padding: '2px 4px', textAlign: 'center', marginTop: '4px', marginLeft: '10px',
              }}
            />
          </div>
          <Card.Text>{restaurant.name}</Card.Text>
          <Card.Text>{restaurant.style.label} {restaurant.price_tier}</Card.Text>
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
    price_tier: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  src: PropTypes.string.isRequired,
};
