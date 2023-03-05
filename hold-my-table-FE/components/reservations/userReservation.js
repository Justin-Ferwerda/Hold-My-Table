import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import { Button } from '@mui/material';
import { deleteReservation } from '../../utils/data/api/reservationData';
import ReviewModal from '../reviews/ReviewModal';

export default function UserReservation({ reservation, user, onUpdate }) {
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
          <Card.Text><CalendarTodayIcon /> {formattedDate}  {formattedTime}</Card.Text>
          <Card.Text><PeopleIcon /> {reservation.guests} guests</Card.Text>
          <Button onClick={(e) => {
            window.location.href = `mailto:${reservation.table.restaurant.email}?subject=My Reservation ${formattedDate} ${formattedTime} { ${user.firstName} ${user.lastName} }`;
            e.preventDefault();
          }}
          >Contact {reservation.table.restaurant.name}
          </Button>
          <Card.Text>Notes: <strong>{reservation.notes}</strong></Card.Text>
          {user.id === reservation.user.id && !reservation.is_past ? <Button className="reservation-delete-btn" variant="contained" color="error" onClick={deleteThisReservation}>Cancel Reservation</Button> : <ReviewModal user={user} table={reservation.table.id} />}
        </Card.Body>
      </Card>
    </div>

  );
}

UserReservation.propTypes = {
  reservation: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
    is_past: PropTypes.bool,
    notes: PropTypes.string,
    guests: PropTypes.number,
    date: PropTypes.string,
    id: PropTypes.number,
    table: PropTypes.shape({
      restaurant: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
      }),
      id: PropTypes.number,
    }),
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};
