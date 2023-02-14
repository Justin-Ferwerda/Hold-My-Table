/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import StarRating from '../StarRating';

export default function RestaurantCard({ restaurant, src }) {
  return (
    <div className="all-restaurants-card">
      <Card className="text-center restaurant-card">
        <img className="card-img-top" src={src} />
        <Card.Body className="restaurant-card-body">
          <Card.Text><h1>{restaurant.name}</h1></Card.Text>
          <StarRating rating={restaurant.rating} />
          <Card.Text>{restaurant.bio}</Card.Text>
          <Card.Text><CallIcon /> {restaurant.phoneNumber}</Card.Text>
          <Card.Text>
            <a href={restaurant.websiteUrl} target="_blank" rel="noreferrer"><LanguageIcon /> {restaurant.websiteUrl}</a>
          </Card.Text>
          <Card.Text>
            <a href={`https://www.instagram.com/${restaurant.instagram}/?hl=en`} target="_blank" rel="noreferrer">
              <InstagramIcon /> @{restaurant.instagram}
            </a>
          </Card.Text>
          <Card.Text>{restaurant?.style?.label} {restaurant.priceTier}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    style: PropTypes.shape({
      label: PropTypes.string,
    }),
    bio: PropTypes.string,
    phoneNumber: PropTypes.string,
    instagram: PropTypes.string,
    websiteUrl: PropTypes.string,
    priceTier: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  src: PropTypes.string.isRequired,
};
