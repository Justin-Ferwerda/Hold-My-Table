import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function FeaturedRestaurant({ restaurant }) {
  return (
    <Card>
      <Card className="bg-dark text-white">
        <Card.Img src={restaurant?.bannerPic} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="featured-title">{restaurant?.name}</Card.Title>
          <h3 className="featured-text">
            Check Out Our Featured Restaurant!!
          </h3>
        </Card.ImgOverlay>
      </Card>
    </Card>
  );
}

FeaturedRestaurant.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    bannerPic: PropTypes.string,
  }).isRequired,
};
