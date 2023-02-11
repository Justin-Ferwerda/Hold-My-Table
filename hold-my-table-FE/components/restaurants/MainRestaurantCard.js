import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

export default function MainRestaurantCard({ restaurant, src }) {
  <div className="all-restaurants-card">
    <Card className="text-center restaurant-card">
      <Image className="card-img-top" src={src} alt="Card image cap" />
      <Card.Body className="restaurant-card-body">
        <div className="starRating">
          Rating:
          <Rating
            allowHover={false}
            size={26}
            allowFraction
            iconsCount={5}
            ratingValue={restaurant.rating}
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
  </div>;
}

MainRestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    style: PropTypes.shape({
      label: PropTypes.string,
    }),
    price_tier: PropTypes.string,
    rating: PropTypes.number,
  }),
};
