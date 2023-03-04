import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function RestaurantProfile({ restaurant }) {
  return (

    <div className="restaurantProfileCard">
      <Card>
        <Card.Body>
          <Card.Text>admin email: {restaurant.admin_user?.email}</Card.Text>
          <Card.Text>name: {restaurant.name}</Card.Text>
          <Card.Text>email: {restaurant.email} </Card.Text>
          <Card.Text>phone: {restaurant.phone_number}</Card.Text>
          <Card.Text>address: {restaurant.address}</Card.Text>
          <Card.Text>website: {restaurant.website_url}</Card.Text>
          <Card.Text>instagram: {restaurant.instagram}</Card.Text>
          <Card.Text>cancellation policy: {restaurant.cancellation_policy}</Card.Text>
          <Card.Text>style: {restaurant.style?.label}</Card.Text>
          <Card.Text>price tier: {restaurant.price_tier}</Card.Text>
          <Card.Text>bio: {restaurant.bio}</Card.Text>
          <Link href={`/restaurants/edit/${restaurant.id}`} passHref>
            <Button>Edit Profile</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>

  );
}

RestaurantProfile.propTypes = {
  restaurant: PropTypes.shape({
    bannerPic: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    address: PropTypes.string,
    website_url: PropTypes.string,
    instagram: PropTypes.string,
    cancellation_policy: PropTypes.string,
    priceTier: PropTypes.string,
    bio: PropTypes.string,
    id: PropTypes.number,
    style: PropTypes.shape({
      label: PropTypes.string,
    }),
    admin_user: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
};
