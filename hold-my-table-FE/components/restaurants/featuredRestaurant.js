import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function FeaturedRestaurant({ restaurant }) {
  return (
    <Card>
      <Card className="bg-dark text-white">
        <Card.Img src={restaurant?.bannerPic} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="featured-title">{restaurant?.name}</Card.Title>
          <Link href={`/restaurants/${restaurant?.id}`} passHref>
            <h3 className="featured-text">
              Check Out Our Featured Restaurant!!
            </h3>
          </Link>
        </Card.ImgOverlay>
      </Card>
    </Card>
  );
}

FeaturedRestaurant.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    bannerPic: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
