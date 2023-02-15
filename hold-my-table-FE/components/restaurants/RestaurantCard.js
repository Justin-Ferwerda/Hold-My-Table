/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import StarRating from '../StarRating';

export default function RestaurantCard({ restaurant, src }) {
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={src} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{restaurant.name}</h5>
            <StarRating rating={restaurant.rating} />
            <p className="card-text">{restaurant.bio}</p>
            <p className="card-text"><a href={restaurant.websiteUrl} target="_blank" rel="noreferrer"><LanguageIcon /> {restaurant.websiteUrl}</a></p>
            <p className="card-text">
              <a href={`https://www.instagram.com/${restaurant.instagram}/?hl=en`} target="_blank" rel="noreferrer">
                <InstagramIcon /> @{restaurant.instagram}
              </a>
            </p>
            <p className="card-text">
              {restaurant?.style?.label} {restaurant.priceTier}
            </p>
          </div>
        </div>
      </div>
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
