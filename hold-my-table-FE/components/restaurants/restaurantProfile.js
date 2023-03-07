import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { Button } from '@mui/material';

export default function RestaurantProfile({ restaurant }) {
  return (

    <div className="restaurantProfileCard">
      <Card>
        <Card.Body>
          <Card.Text><strong>Admin Email:  </strong>{restaurant.admin_user?.email}</Card.Text>
          <Card.Text><strong>Name:  </strong>{restaurant.name}</Card.Text>
          <Card.Text><strong>Email:  </strong>{restaurant.email} </Card.Text>
          <Card.Text><strong>Phone:  </strong>Phone:  {restaurant.phone_number}</Card.Text>
          <Card.Text><strong>Address:  </strong>{restaurant.address}</Card.Text>
          <Card.Text><strong>Website:  </strong>{restaurant.website_url}</Card.Text>
          <Card.Text><strong>instagram:  </strong>{restaurant.instagram}</Card.Text>
          <Card.Text><strong>Cancellation Policy:  </strong>{restaurant.cancellation_policy}</Card.Text>
          <Card.Text><strong>Cuisine:  </strong>{restaurant.style?.label}</Card.Text>
          <Card.Text><strong>Price Tier:  </strong>{restaurant.price_tier}</Card.Text>
          <Card.Text><strong>Bio:  </strong>{restaurant.bio}</Card.Text>
          <Link href={`/restaurants/edit/${restaurant.id}`} passHref>
            <Button variant="contained">Edit Profile</Button>
          </Link>
          <Link href={`/reservations/${restaurant.id}`} passHref>
            <Button className="profile-layout-btn" variant="contained">Edit Layout</Button>
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
    price_tier: PropTypes.string,
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
