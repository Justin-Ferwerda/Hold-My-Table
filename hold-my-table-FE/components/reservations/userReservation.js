import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Button } from 'react-bootstrap';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import { deleteReservation } from '../../utils/data/api/reservationData';

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
          <a href={reservation.table.restaurant.website_url}>{reservation.table.restaurant.website_url}</a>
          {user.id === reservation.user.id ? <Button variant="outline-secondary" onClick={deleteThisReservation}>Cancel Reservation</Button> : <div /> }
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
    guests: PropTypes.number,
    date: PropTypes.string,
    id: PropTypes.number,
    table: PropTypes.shape({
      restaurant: PropTypes.shape({
        name: PropTypes.string,
        website_url: PropTypes.string,
      }),
    }),
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};
