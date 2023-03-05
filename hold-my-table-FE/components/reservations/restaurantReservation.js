import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { deleteReservation } from '../../utils/data/api/reservationData';

export default function RestaurantReservation({ reservation, user, onUpdate }) {
  const formattedDate = moment(reservation.date).format('dddd, MMM D, YYYY');
  const formattedTime = moment(reservation.date).format('hh:mma');
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
          <Card.Text><PeopleIcon /> {reservation.guests} guests {'    '}<TableRestaurantIcon />{reservation.table.number}</Card.Text>
          <Button onClick={(e) => {
            window.location.href = `mailto:${reservation.user.email}?subject=Regarding Your Reservation ${formattedDate} ${formattedTime} at ${reservation.table.restaurant.name}`;
            e.preventDefault();
          }}
          >Contact {reservation.user.first_name} {reservation.user.last_name}
          </Button>
          <Card.Text>Notes: <strong>{reservation.notes}</strong></Card.Text>
          {user.id === reservation.table.restaurant.admin_user && reservation.is_past ? <div /> : <Button variant="contained" color="error" onClick={deleteThisReservation}>Cancel Reservation</Button>}
        </Card.Body>
      </Card>
    </div>

  );
}

RestaurantReservation.propTypes = {
  reservation: PropTypes.shape({
    notes: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
    }),
    guests: PropTypes.number,
    is_past: PropTypes.bool,
    date: PropTypes.string,
    id: PropTypes.number,
    table: PropTypes.shape({
      number: PropTypes.number,
      restaurant: PropTypes.shape({
        admin_user: PropTypes.number,
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
