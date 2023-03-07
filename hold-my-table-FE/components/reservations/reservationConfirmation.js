import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Button, Form, FloatingLabel,
} from 'react-bootstrap';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import moment from 'moment';
import PeopleIcon from '@mui/icons-material/People';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createReservation } from '../../utils/data/api/reservationData';

export default function Confirmation({
  dateValue, timeValue, guestValue, table, restaurant,
}) {
  const { user, updateUser } = useAuth();
  const [notes, setNotes] = useState('');
  const router = useRouter();

  const payload = {
    dateValue,
    timeValue,
    guestValue,
    table: Number(table),
    user: user.id,
    policy: restaurant.cancellationPolicy,
    notes,
  };

  const date = moment(dateValue).format('MMM Do YYYY');

  const time = moment(timeValue, 'HH:mm:ss').format('h:mm A');

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  const handleClick = () => {
    createReservation(payload).then(() => updateUser(user.uid)).then(() => router.push(`/user/${user.id}`));
  };

  return (
    <div className="reservation-confirmation">
      <Card>
        <Card.Header>Complete Your Reservation</Card.Header>
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Text>{user.firstName} {user.lastName}</Card.Text>
          <Card.Text><CalendarTodayIcon />  {date}, {time}</Card.Text>
          <Card.Text><PeopleIcon />  {guestValue} guests</Card.Text>
          <Card.Text>{restaurant.cancellationPolicy}</Card.Text>
          <FloatingLabel controlId="floatingInput1" label="Notes" className="mb-3">
            <Form.Control type="text" placeholder="notes" name="notes" value={notes} onChange={handleChange} required />
          </FloatingLabel>
          <Card.Footer><Button onClick={handleClick}>Book Now</Button></Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}

Confirmation.propTypes = {
  dateValue: PropTypes.string.isRequired,
  timeValue: PropTypes.string.isRequired,
  guestValue: PropTypes.number.isRequired,
  table: PropTypes.number.isRequired,
  restaurant: PropTypes.shape({
    cancellationPolicy: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
