import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Button } from 'react-bootstrap';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import CallIcon from '@mui/icons-material/Call';
import { deleteReservation } from '../../utils/data/api/reservationData';

export default function userReservation({ reservation, user, onUpdate }) {
  const formattedDate = moment(reservation.date).format('dddd, MMM D, YYYY');
  const formattedTime = moment(reservation.date).format('hh:mm a');
  const deleteThisReservation = () => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      deleteReservation(reservation.id).then(() => onUpdate());
    }
  };

  return (

    <div className="reservationCard">
      <Card>
        <Card.Body>
          <h3>{reservation.table.restaurant.name}</h3>
          <Card.Text><CalendarTodayIcon /> {formattedDate}, {formattedTime}</Card.Text>
          <Card.Text><PeopleIcon /> {reservation.guests} guests</Card.Text>
          <Card.Text><CallIcon /></Card.Text>
          <a href={reservation.table.restaurant.websiteUrl}>{reservation.table.restaurant.name}</a>
          {user.id === reservation.user.id ? <Button onClick={deleteThisReservation} /> : <div /> }
        </Card.Body>
      </Card>
    </div>

  );
}

userReservation.propTypes = {
  reservation: PropTypes.shape({}).isRequired,
};
