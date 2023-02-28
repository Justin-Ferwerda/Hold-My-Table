import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Image } from 'react-bootstrap';
import Link from 'next/link';

export default function RestaurantProfile({ restaurant }) {
  return (

    <div className="restaurantProfileCard">
      <Card>
        <Card.Body>
          <Image src={restaurant.bannerPic} />
          <Card.Text>admin email: {restaurant.user.email}</Card.Text>
          <Card.Text>Name: {restaurant.name}</Card.Text>
          <Card.Text>Email: {restaurant.email} </Card.Text>
          <Card.Text>phone: {restaurant.phoneNumber}</Card.Text>
          <Card.Text>address: {restaurant.address}</Card.Text>
          <Card.Text>website: {restaurant.websiteUrl}</Card.Text>
          <Card.Text>instagram: {restaurant.instagram}</Card.Text>
          <Card.Text>cancellation policy: {restaurant.cancellationPolicy}</Card.Text>
          <Card.Text>style: {restaurant.style.label}</Card.Text>
          <Card.Text>price tier: {restaurant.priceTier}</Card.Text>
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
    phoneNumber: PropTypes.string,
    address: PropTypes.string,
    websiteUrl: PropTypes.string,
    instagram: PropTypes.string,
    cancellationPolicy: PropTypes.string,
    priceTier: PropTypes.string,
    bio: PropTypes.string,
    id: PropTypes.number,
    style: PropTypes.shape({
      label: PropTypes.string,
    }),
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
};
