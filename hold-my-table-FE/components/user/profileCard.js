import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Image } from 'react-bootstrap';
import CallIcon from '@mui/icons-material/Call';
import Link from 'next/link';

export default function UserProfile({ user }) {
  return (

    <div className="userProfileCard">
      <Card>
        <Card.Body>

          <Card.Text>Name: {user.firstName} {user.lastName}</Card.Text>
          <Card.Text>Email: {user.email} </Card.Text>
          <Card.Text><CallIcon />     {user.phone}</Card.Text>
          <Image src={user.profileImageUrl} />
          <Link href={`/user/edit/${user.id}`} passHref>
            <Button>Edit Profile</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>

  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    profileImageUrl: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,

};
